import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './DisplayImage.module.scss';
import images from '~/assets/images';
import { useQuestion } from '~/context/QuestionProvider';
import { isEdit as editing } from '~/redux/features/testSlice';

const cx = classNames.bind(styles);

const DisplayImage = ( { imageUrl, altText, isEditable, onImageUpload, ...props } ) => {
  const isEdit = useSelector( editing );
  const [selectedImage, setSelectedImage] = useState(null);
  const question = useQuestion();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageUpload(file);
    }
  };
  return (
    <div className={cx('container')}>
      {isEditable ? (
        <Fragment>
          <Image
            onClick={() => document.getElementById(`image_${question.id}`).click()}
            className={cx('add-image')}
            src={isEdit ? selectedImage || question.photo : selectedImage || images.addImage}
            alt="Add"
          />
          <input
            type="file"
            id={`image_${question.id}`}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Fragment>
      ) : (
        <Image src={imageUrl} alt={altText} {...props} />
      )}
    </div>
  );
};

export default DisplayImage;
