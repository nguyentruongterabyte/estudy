import classNames from 'classnames/bind';
import styles from './AccountManager.module.scss';
import CustomTabs from '~/components/CustomTabs';
import { Button, Table } from 'react-bootstrap';
import hooks from '~/hooks';
import { Fragment, useEffect, useState } from 'react';
import config from '~/config';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '~/components/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { accountList, changeAccounts, deleteAccount } from '~/redux/features/accountsSlice';
import AddButton from '~/components/AddButton';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const AccountManager = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAllUser } = hooks.useUserService();
  const accounts = useSelector(accountList);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUser();
      dispatch(changeAccounts({ accounts: users.filter((user) => !user.roles.includes(config.roles.admin)) }));
    };

    fetchUsers();
  }, []);

  console.log(accounts);

  return (
    <div className={cx('container')}>
      <CustomTabs
        className={cx('account-tabs')}
        defaultActiveKey={'editors'}
        items={[
          {
            title: t('editor'),
            eventKey: 'editors',
            content: (
              <div className={cx('editor')}>
                <UsersTable items={accounts.filter((account) => account.roles.includes(config.roles.editor))} />
                <AddButton onClick={() => navigate(config.routes.createEditorAccount)} className={cx('add-button')}>
                  {t('createEditorAccount')}
                </AddButton>
              </div>
            ),
          },
          {
            title: t('user'),
            eventKey: 'users',
            content: <UsersTable items={accounts.filter((account) => account.roles.includes(config.roles.user))} />,
          },
        ]}
      />
    </div>
  );
};

const UsersTable = ({ items = [] }) => {
  const { t } = useTranslation();
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteUser } = hooks.useUserService();

  const handleConfirmDeleteAccount = (event, accountId) => {
    event.stopPropagation();
    setId(accountId);
    setShowDeleteModal(true);
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false);
    await deleteUser(id);
    dispatch(deleteAccount({ id }));
  };

  const renderItems = () => (
    <Fragment>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.email}</td>
          <td>
            <Button
              onClick={(e) => handleConfirmDeleteAccount(e, item.id)}
              className={cx('delete-button')}
              size="lg"
              variant="danger"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        </tr>
      ))}

      <CustomModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        handleAgreeButtonClick={handleDeleteAccount}
        title={t('deleteAccount')}
        body={t('confirmDeleteAccount')}
      />
    </Fragment>
  );

  return (
    <Table striped bordered hover className={cx('table')}>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('firstName')}</th>
          <th>{t('lastName')}</th>
          <th>{t('phoneNumber')}</th>
          <th>{t('email')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={cx('body')}>{renderItems()}</tbody>
    </Table>
  );
};

export default AccountManager;
