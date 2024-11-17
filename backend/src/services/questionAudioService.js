import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuestionAudio = await db.QuestionAudio.create(data);
      resolve(newQuestionAudio);
    } catch (e) {
      reject(e);
    }
  });
};

const findAudioByQuestionId = async ( questionId ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionAudio = await db.QuestionAudio.findOne( {
        attributes: [ 'audioId' ],
        where: { questionId },
        raw: true
      } );

      if ( questionAudio ) {
        const audio = await db.Audio.findOne( {
          where: {id: questionAudio.audioId}
        } )
        
        resolve( audio );
      } else reject(new Error(`audio not found for #${questionId}`))
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { save, findAudioByQuestionId };
