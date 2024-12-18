import classNames from 'classnames/bind';
import styles from './ContentManager.module.scss';
import UserModeProvider from '~/context/UserModeProvider';
import Header from '~/components/Compose/Header';
import { Fragment, useState } from 'react';
import Sidebar from '~/components/Compose/Sidebar';
import Bottombar from '~/components/Bottombar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import CustomModal from '~/components/CustomModal';

const cx = classNames.bind(styles);

const fn = () => {};

const ContentManager = ({
  className,

  // user mode
  isUser = false,
  isDisplayAnswerText,
  isDisplayQuestionText,

  // editor mode
  isEdit,
  isAddNew,
  isComplete,

  // header
  headerTitle,
  onHeaderCancel = fn,
  onHeaderComplete = fn,

  // sidebar
  sidebarTitle,
  sidebarChildren = <Fragment />,

  // Main content
  mainChildren = <Fragment />,

  // bottombar
  isEnableBottombar = false,
  bottombarChildren = <Fragment />,

  // Modal
  modalData = [],
}) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBottombar, setShowBottombar] = useState(false);
  return (
    <div className={cx('container', className)}>
      <UserModeProvider
        isUserMode={isUser}
        isDisplayAnswerText={isDisplayAnswerText}
        isDisplayQuestionText={isDisplayQuestionText}
      >
        {/* Header */}
        <Header
          className={cx('header', { scaled: showSidebar })}
          title={showSidebar ? '' : headerTitle}
          show={showSidebar}
          setShow={setShowSidebar}
          isEdit={isEdit}
          isAddNew={isAddNew}
          isComplete={isComplete}
          onCancel={onHeaderCancel}
          onComplete={onHeaderComplete}
        />
        {/* Main */}
        <div
          className={cx('main', {
            'sidebar-scaled': showSidebar,
            'bottombar-scaled': showBottombar,
          })}
        >
          {/* Main Content */}
          {mainChildren}
        </div>

        {/* Sidebar */}
        <Sidebar title={sidebarTitle} show={showSidebar}>
          {/* sidebar content */}
          {sidebarChildren}
        </Sidebar>

        {/* Bottombar */}
        {isEnableBottombar && (
          <Fragment>
            <Bottombar className={cx('bottom-bar', { scaled: showSidebar })} show={showBottombar}>
              {/* Bottombar content */}
              {bottombarChildren}
            </Bottombar>
            <div
              className={cx('toggle-bottom-bar-button', {
                scaled: showSidebar,
                offset: !showBottombar,
              })}
              onClick={() => setShowBottombar((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showBottombar ? faCheck : faChevronUp} />
            </div>
          </Fragment>
        )}

        {/* Modal ask confirm */}
        {modalData.map((modal, index) => (
          <CustomModal
            key={index}
            title={modal.title}
            body={modal.body}
            show={modal.show}
            setShow={modal.setShow || fn}
            handleAgreeButtonClick={modal.handleAgreeButtonClick || fn}
            isEnableAgreeButton={modal.isEnableAgreeButton}
            {...modal.props}
          />
        ))}
        <ToastContainer stacked draggable />
      </UserModeProvider>
    </div>
  );
};

export default ContentManager;
