import db from "../models/index";

const createVocabularyTopic = (data) => {
  return new Promise( async ( resolve, reject ) => {
    try {
      const newTopic = await db.VocabularyTopic.create( {
        name: data.name
      } );
      resolve( newTopic );
    } catch ( e ) {
      reject( e );
    }
  } );
}

module.exports = {
  createVocabularyTopic
}