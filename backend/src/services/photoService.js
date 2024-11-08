import db from '../models/index';

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

module.exports = {
  getByQuestionId
}