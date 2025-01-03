import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './DisplayImage.module.scss';
import images from '~/assets/images';
import { isEdit as editing } from '~/redux/features/questionsSingleSlice';

const cx = classNames.bind(styles);

const DisplayImage = ({
  isError = false,
  imageUrl,
  altText,
  isEditable,
  onImageUpload,
  photoId,
  className,
  ...props
}) => {
  const isEdit = useSelector(editing);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageUpload(file);
    }
  };

  useEffect(() => {
    setSelectedImage(imageUrl);
  }, [imageUrl]);
  return (
    <div className={cx('container', className, { error: isError })}>
      {isEditable ? (
        <Fragment>
          <Image
            rounded
            onClick={() => document.getElementById(`image_${photoId}`).click()}
            className={cx('add-image')}
            src={isEdit ? selectedImage || imageUrl : selectedImage || images.addImage}
            alt="Add"
          />
        </Fragment>
      ) : (
        <Image className={cx('photo')} src={imageUrl} alt={altText} {...props} />
      )}
      <input
        type="file"
        id={`image_${photoId}`}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default DisplayImage;
