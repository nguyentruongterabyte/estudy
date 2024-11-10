import db from '../models/index';
import { bucket } from '../config/firebaseConfig';
import { unlinkSync } from 'fs';

const getByQuestionId = ( questionId ) => {
  return new Promise( async ( resolve, reject ) => {
    try {
      const photo = await db.Photo.findOne( {
        attributes: [ 'filePath' ],
        where: { questionId },
        raw: true
      } )
      resolve( photo );
    } catch ( e ) {
      reject( e );
    }
  } );
}

const uploadFirebase = ( file ) => {
  return new Promise( async ( resolve, reject ) => {
    try {
      const firebaseFilename = `photos/${ Date.now() }-${ file.originalname }`;
      await bucket.upload(file.path, {
        destination: firebaseFilename,
        metadata: {
          contentType: 'image/jpeg',
        },
      });
      
      const fileRef = bucket.file(firebaseFilename);

       const [url] = await fileRef.getSignedUrl({
         action: 'read',
         expires: '03-09-2491',
       });

       unlinkSync(file.path);
       resolve(url);
    } catch ( e ) {
      reject( e );
    }
  })
}

module.exports = {
  getByQuestionId,
  uploadFirebase
}