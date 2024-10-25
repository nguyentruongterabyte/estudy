import db from "../models/index";
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync( 10 );

const hashUserPassword = ( password ) => {
  return new Promise( async( resolve, reject ) => {
    try {
      let hashPassword = await bcrypt.hashSync( password, salt );
      resolve( hashPassword );
    } catch ( e ) {
      reject( e );
    }
  })
}

const checkUserEmail = ( userEmail ) => {
  return new Promise( async ( resolve, reject ) => { 
    try {
      let user = await db.User.findOne( {
        where: { email: userEmail }
      } );

      if ( user ) {
        resolve( true );
      } else {
        resolve( false );
      }
    } catch ( e ) {
      reject( e );
    }
  } );
}

const getAllUsers = ( userId ) => {
  return new Promise( async ( resolve, reject ) => {
    try {
      let users = '';
      if ( userId === 'ALL' ) {
        users = await db.User.findAll( {
          attributes: {
            exclude: [ 'password' ]
          }
        } );
      }

      if ( userId && userId !== 'ALL' ) {
        users = await db.User.findOne( {
          where: { id: userId },
          attributes: {
            exclude: [ 'password' ]
          }
        } );
      }

      resolve( users );
    } catch ( e ) {
      reject( e );
    }
  })
} 

const getUserByEmail = ( email ) =>{
  return new Promise( async ( resolve, reject ) => {
    try {
      const user = await db.User.findOne( {
        attributes: [ 'id', 'email', 'roleId', 'password', 'firstName', 'lastName' ],
        where: { email: email },
        raw: true
      } );

      resolve( user );
    } catch ( error ) {
      reject( error );
    }
  } );
}

const createUser = ( data ) => {
  return new Promise( async ( resolve, reject ) => {
    try {
      const newUser = await db.User.create( {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        password: data.password,
        email: data.email,
        roleId: 30001
      } );

      resolve( newUser );
    } catch ( e ) {
      reject( e );
    }
  })
}


const comparePassword = ( password, hashedPassword ) => {
  return new Promise( async ( resolve, reject ) => {
    try {
      const matches = bcrypt.compareSync( password, hashedPassword );
      resolve( matches );
    } catch ( error ) {
      reject( error );  
    }
  } );
}

module.exports = {
  getAllUsers, 
  checkUserEmail,
  hashUserPassword,
  createUser,
  comparePassword,
  getUserByEmail
}