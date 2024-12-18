import classNames from 'classnames/bind';
import styles from './UserRankings.module.scss';
import Loading from '../Loading';
import CustomTable from '../CustomTable';
import images from '~/assets/images';
import RenderIf from '../RenderIf';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const UserRankings = ({
  topUsers = [],
  onSelectTopUsers,
  isLoading,
  isEnableSelectTopUsers = true,
  isMaskEmail = false,
}) => {
  const { t } = useTranslation();
  const formatTime = (secondsElapsed) => {
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const maskEmail = (email) => {
    let [username, domain] = email.split('@');

    let maskedUsername = username.charAt(0) + '***' + username.slice(-1);

    return maskedUsername + '@' + domain;
  };

  return (
    <div className={cx('container')}>
      <RenderIf isTrue={isEnableSelectTopUsers}>
        <select onChange={(e) => onSelectTopUsers(parseInt(e.target.value, 10))}>
          <option value={5}>Top 5</option>
          <option value={20}>Top 20</option>
          <option value={100}>Top 100</option>
        </select>
      </RenderIf>
      {isLoading ? (
        <Loading />
      ) : (
        <CustomTable
          striped
          bordered
          hovered
          headerTitles={[t('ranking'), t('fullName'), 'Email', t('testName'), t('correctAnswers'), t('testTime')]}
          bodyRows={topUsers.map((user, index) => [
            <span className={cx('ranking')}>
              {index === 0 ? (
                <img className={cx('ranking-img')} src={images.firstRank} alt={'Hạng 1'} />
              ) : index === 1 ? (
                <img className={cx('ranking-img')} src={images.secondRank} alt={'Hạng 2'} />
              ) : index === 2 ? (
                <img className={cx('ranking-img')} src={images.thirdRank} alt={'Hạng 3'} />
              ) : (
                <span className={cx('ranking-number')}>{index + 1}</span>
              )}
            </span>,
            !(user.firstName || user.lastName) ? t('notUpdated') : `${user.firstName ?? ''} ${user.lastName ?? ''}`,
            isMaskEmail ? maskEmail(user.email) : user.email,
            user.groupName,
            `${user.correctCount}/${user.totalQuestions}`,
            formatTime(user.totalTime),
          ])}
        />
      )}
    </div>
  );
};

export default UserRankings;
