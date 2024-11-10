import db from '../models/index';
import { bucket } from '../config/firebaseConfig';
import { unlinkSync } from 'fs';

const getByQuestionId = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionAudio = await db.QuestionAudio.findOne({
        attributes: ['audioId'],
        where: { questionId },
        raw: true,
      });
      if (questionAudio) {
        const audio = await db.Audio.findOne({
          attributes: ['audioLink'],
          where: { id: questionAudio.audioId },
          raw: true,
        });

        resolve(audio);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const uploadFirebase = (file) => {

  return new Promise( async ( resolve, reject ) => {
    try { 
      const firebaseFilename = `audios/${Date.now()}-${file.originalname}`;
      await bucket.upload( file.path, {
        destination: firebaseFilename,
        metadata: {
          contentType: 'audio/mpeg',
        }
      } );

      const fileRef = bucket.file( firebaseFilename );

      const [ url ] = await fileRef.getSignedUrl( {
        action: 'read',
        expires: '03-09-2491'
      } );

      unlinkSync( file.path );
      resolve( url );
    } catch ( e ) {
      reject(e)
    }
  } );

  
}

module.exports = { getByQuestionId, uploadFirebase };
