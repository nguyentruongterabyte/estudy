import db from '../models/index';
import { bucket } from '../config/firebaseConfig';
import { unlinkSync } from 'fs';

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const audio = await db.Audio.destroy({
        where: { id },
      });
      resolve(audio);
    } catch (e) {
      reject(e);
    }
  });
};

const get = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const audio = await db.Audio.findOne({
        where: { id },
      });
      resolve(audio);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (audio) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = audio;
      await db.Audio.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const save = (audioLink) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newAudio = await db.Audio.create({
        audioLink,
      });
      resolve(newAudio);
    } catch (e) {
      reject(e);
    }
  });
};

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
          attributes: ['audioLink', 'id'],
          where: { id: questionAudio.audioId },
          raw: true,
        });

        resolve(audio);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const uploadFirebase = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const firebaseFilename = `audios/${Date.now()}-${file.originalname}`;
      await bucket.upload(file.path, {
        destination: firebaseFilename,
        metadata: {
          contentType: 'audio/mpeg',
        },
      });

      const fileRef = bucket.file(firebaseFilename);

      const [url] = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });

      unlinkSync(file.path);
      resolve(url);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFirebaseAudioByUrl = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Extract file name from URL
      const filePath = url.split('/').slice(-2).join('/').split('?')[0]; // Get the `audos/<filename>` section

      // Create a reference to the file to delete
      const fileRef = bucket.file(filePath);

      // Perform file deletion
      await fileRef.delete();
      resolve();
    } catch (e) {
      resolve(e);
    }
  });
};

module.exports = { get, getByQuestionId, uploadFirebase, save, deleteFirebaseAudioByUrl, update, destroy };
