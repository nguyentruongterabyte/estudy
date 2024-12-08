import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import images from '~/assets/images';
import DisplayImage from '~/components/DisplayImage';
import hooks from '~/hooks';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import CustomModal from '~/components/CustomModal';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const Profile = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState('');
  const [initialData, setInitialData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);
  const [file, setFile] = useState();
  const { getUserById, updateUser, updateAvatar } = hooks.useUserService();
  const { auth } = hooks.useAuth();
  const accessToken = auth.accessToken;
  const decoded = accessToken && jwtDecode(accessToken);
  const id = decoded?.userInfo?.id || -1;
  const { uploadPhoto } = hooks.usePhotoService();

  const hasChanges =
    firstName !== initialData.firstName || lastName !== initialData.lastName || phoneNumber !== initialData.phoneNumber;

  const handleSaveChanges = async () => {
    const user = {
      firstName,
      lastName,
      phoneNumber,
    };

    await updateUser(id, user);
    setInitialData(user);
  };

  const handleChangeAvatar = (file) => {
    setShowEditAvatarModal(true);
    setFile(file);
  };

  const handleEditAvatar = async () => {
    setShowEditAvatarModal(false);
    const photoUrl = await toast.promise(uploadPhoto(file), {
      pending: t('uploadingAvatar'),
      success: t('uploadAvatarSuccess'),
      error: t('uploadAvatarFailed'),
    });

    await toast.promise(updateAvatar(id, photoUrl), {
      pending: t('savingAvatar'),
      success: t('saveAvatarSuccess'),
      error: t('saveAvatarFailed'),
    });
  };

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      const user = await getUserById(id);
      return user;
    };

    if (id !== -1) {
      fetchUserInfo(id)
        .then((user) => {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber(user.phoneNumber);
          setAvatar(user.photo);
          setInitialData({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
          });
        })
        .catch((e) => console.error(e));
    }
  }, [id]);

  return (
    <Container className={cx('container')}>
      <Row className={cx('row')}>
        <Col sm={2} className={cx('labels')}>
          <Form.Label htmlFor="lastname" className={cx('label')}>
            {t('lastName')}
          </Form.Label>
          <Form.Label htmlFor="firstname" className={cx('label')}>
            {t('firstName')}
          </Form.Label>
          <Form.Label htmlFor="phone-number" className={cx('label')}>
            {t('phoneNumber')}
          </Form.Label>
        </Col>
        <Col sm={6} className={cx('input-group')}>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
            placeholder={t('lastName')}
            className={cx('input')}
          />
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t('firstName')}
            id="firstname"
            className={cx('input')}
          />
          <Form.Control
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={t('phoneNumber')}
            id="phone-number"
            className={cx('input')}
          />
        </Col>

        <Col sm={4} className={cx('avatar-wrapper')}>
          <DisplayImage
            className={cx('avatar')}
            width={250}
            onImageUpload={handleChangeAvatar}
            photoId={id}
            roundedCircle
            src={file ? URL.createObjectURL(file) : avatar ? avatar : images.userImage}
          />
          <Button size="lg" onClick={() => document.getElementById(`image_${id}`).click()}>
            {t('change')}
          </Button>
        </Col>
      </Row>
      <Row className={cx('row')}>
        <Col sm={2}></Col>
        <Col sm={6} className={cx('save-button')}>
          <Button
            onClick={handleSaveChanges}
            className={cx('button')}
            size="lg"
            disabled={!hasChanges} // Disable khi không có thay đổi
          >
            {t('saveChanges')}
          </Button>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <ToastContainer />
      <CustomModal
        title={t('changeAvatar')}
        body={t('confirmChangeAvatar')}
        show={showEditAvatarModal}
        setShow={setShowEditAvatarModal}
        handleAgreeButtonClick={handleEditAvatar}
      />
    </Container>
  );
};

export default Profile;
