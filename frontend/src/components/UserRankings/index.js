import classNames from 'classnames/bind';
import styles from './UserRankings.module.scss';
import Loading from '../Loading';
import CustomTable from '../CustomTable';
import images from '~/assets/images';
import RenderIf from '../RenderIf';

const cx = classNames.bind(styles);

const UserRankings = ({ topUsers = [], onSelectTopUsers, isLoading, isEnableSelectTopUsers = true }) => {
  const formatTime = (secondsElapsed) => {
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
          headerTitles={['Xếp hạng', 'Họ và tên', 'email', 'Tên bài kiểm tra', 'Câu trả lời đúng', 'Thời gian làm bài']}
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
            `${user.firstName ?? ''} ${user.lastName ?? ''}`,
            user.email,
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
