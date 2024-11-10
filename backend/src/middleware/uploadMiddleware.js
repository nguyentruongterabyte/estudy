import multer from 'multer';

const storage = multer.diskStorage( {
  destination: ( req, file, cb ) => {
    cb( null, 'uploads/' ); // Save files in the 'uploads/' folder
  },
  filename: ( req, file, cb ) => {
    cb( null, `${ Date.now() }-${ file.originalname }` );
  }
} );

const upload = multer( { storage } );

module.exports = upload;