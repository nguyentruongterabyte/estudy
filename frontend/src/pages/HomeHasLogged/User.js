import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import JsonData from './data.json';
import './style.css';
import hooks from '~/hooks';
import CustomCarousel from '~/components/CustomCarousel';
import UserRankings from '~/components/UserRankings';
import classNames from 'classnames/bind';
import styles from './HomeHasLogged.module.scss';

const cx = classNames.bind(styles);

const User = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div className={cx('container')}>
      <Features data={landingPageData.Features} />
      <UserRankingsSlider />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

const UserRankingsSlider = () => {
  const [parts, setParts] = useState([]);
  const { getAllParts } = hooks.usePartService();
  const { getTopUsersByPartId } = hooks.useAnalyticService();

  useEffect(() => {
    // fetch parts
    // fetch parts
    const fetchParts = async () => {
      try {
        const parts = await getAllParts();

        const partsWithTopUsers = await Promise.all(
          parts.map(async (part) => {
            const topUsers = await getTopUsersByPartId(part.id, 10);
            return { ...part, topUsers };
          }),
        );

        setParts(partsWithTopUsers);
      } catch (error) {
        console.error('Error fetching parts or top users:', error);
      }
    };

    fetchParts();
    // eslint-disable-next-line
  }, []);

  console.log(parts);

  return (
    <CustomCarousel
      className={cx('carousel')}
      items={parts
        .filter((part) => part.topUsers.length > 0)
        .map((part) => ({
          caption: part.name,
          body: <UserRankings isMaskEmail={true} topUsers={part.topUsers} isEnableSelectTopUsers={false} />,
        }))}
    />
  );
};

export default User;
