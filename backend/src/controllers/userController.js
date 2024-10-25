import userService from "../services/userService";

const handleGetAllUser = async ( req, res ) => {
  const id = req.query.id; // ALL, id
  if ( !id ) {
    return res.status( 200 ).json( {
      errCode: 1,
      errMessage: 'Missing required parameters',
      data: []
    })
  }

  const users = await userService.getAllUsers( id );
  return res.status( 200 ).json( {
    errCode: 0,
    errMessage: 'OK',
    data: users
  } );
}

const handleNewUser = async ( req, res ) => {
  const { email, password} = req.body;
  if ( !email || !password ) {
    return res.status( 400 ).json( {
      errCode: 1,
      errMessage: 'Email and password are required'
    } );
  }

  try { 
    // Check for duplicate
    const duplicate = await userService.checkUserEmail( email );
    if ( duplicate ) {
      return res.status( 409 ).json( {
        errCode: 1,
        errMessage: 'Email already exists'
      } );
    } 

    // Encrypt the password
    const hashedPassword = await userService.hashUserPassword( password );

    // Create new user
    const newUser = await userService.createUser( {
      email,
      password: hashedPassword
    } );

    return res.status( 201 ).json( {
      errCode: 0,
      errMessage: 'Register Successfully!',
      data: newUser
    } );
  } catch ( error ) {
    return res.status( 500 ).json( {
      errCode: 1,
      errMessage: error.message
    } );
  }
}


const handleUserLogin = async ( req, res ) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    return res.status( 400 ).json( {
      errCode: 1,
      errMessage: 'Email and password are required!'
    } );
  }

  try { 
  
    // check email exists
    const isExist = await userService.checkUserEmail( email );

    if ( !isExist ) {
      return res.status( 404 ).json( {
        errCode: 1,
        errMessage: 'Your email is not exist in our system. Please try other email!'
      } );
    }

    const user = await userService.getUserByEmail( email );
      if ( !user ) {
        return res.status( 404 ).json( {
          errCode: 2,
          errMessage: 'User not found!'
        } );
    }
    
      const matches = await userService.comparePassword( password, user.password );
        if ( !matches ) {
          return res.status( 401 ).json( {
            errCode: 3,
            errMessage: 'Unauthorized!'
          } );
        }

        delete user.password;
    return res.json(
      {
        errCode: 0,
        errMessage: 'Login successfully!',
        data: user
      }
    );
  } catch ( error ) {
    return res.status( 500 ).json( {
      errCode: 1,
      errMessage: error.message
    } );
  }
}
module.exports = {
  handleGetAllUser,
  handleNewUser,
  handleUserLogin
}