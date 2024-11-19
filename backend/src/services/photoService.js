import db from '../models/index';
import { bucket } from '../config/firebaseConfig';
import { unlinkSync } from 'fs';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPhoto = await db.Photo.create(data);
      resolve(newPhoto);
    } catch (e) {
      reject(e);
    }
  });
};

const get = ( id ) => {
  return new Promise(async(resolve, reject) => {
    try {
      const photo = await db.Photo.findOne({
        where: { id },
      });
      resolve(photo);
    } catch (e) {
      reject(e);
    }
  })
}

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowEffected = await db.Photo.destroy({
        where: { id },
      });
      resolve(rowEffected);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (photo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = photo;
      await db.Photo.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const getByQuestionId = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await db.Photo.findOne({
        attributes: ['filePath', 'id'],
        where: { questionId },
        raw: true,
      });
      resolve(photo);
    } catch (e) {
      reject(e);
    }
  });
};

const uploadFirebase = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const firebaseFilename = `photos/${Date.now()}-${file.originalname}`;
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
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFirebasePhotoByUrl = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Extract file name from URL
      const filePath = url.split('/').slice(-2).join('/').split('?')[0]; // Get the `photos/<filename>` section

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

module.exports = {
  getByQuestionId,
  uploadFirebase,
  save,
  update,
  deleteFirebasePhotoByUrl,
  destroy,
  get
};
