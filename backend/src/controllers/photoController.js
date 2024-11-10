import photoService from '../services/photoService';

const handleUploadPhoto = async ( req, res ) => {
  try {
    const file = req.file;
    const url = await photoService.uploadFirebase(file)

    res.json( {
      errCode: 0,
      errMessage: 'OK',
      data: url,
    })
  } catch ( error ) {
    res.status( 500 ).json( {
      errCode: 1,
      errMessage: error.message
    })
    
  }
}

module.exports = {
  handleUploadPhoto
}