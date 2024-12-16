import classNames from 'classnames/bind';
import styles from './Analytics.module.scss';
import ContentManager from '~/components/ContentManager';
import hooks from '~/hooks';
import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import RenderIf from '~/components/RenderIf';
import UserRankings from '~/components/UserRankings';

const cx = classNames.bind(styles);

const ANALYTIC_TYPE = {
  TOP_USERS: 'TOP_USERS',
  DATE_AVERAGE: 'DATE_AVERAGE',
};

const TYPES = {
  GRAMMAR: 'GRAMMAR',
  READING_LISTENING: 'READING_LISTENING',
};

const Analytics = () => {
  const [analyticType, setAnalyticType] = useState(ANALYTIC_TYPE.TOP_USERS);
  const [topUsers, setTopUsers] = useState([]);
  const { getTopUsersByPartId } = hooks.useAnalyticService();
  const [partId, setPartId] = useState();
  const [grammarId, setGrammarId] = useState();
  const [quantityOfTopUsers, setQuantityOfTopUsers] = useState(5);
  const [ isTopUsersLoading, setIsTopUsersLoading ] = useState( false );

  const fetchTopUsersByPart = async () => {
    setIsTopUsersLoading(true)
    const topUsers = await getTopUsersByPartId(partId, quantityOfTopUsers);
    setIsTopUsersLoading( false );
    return topUsers;
  };

  const handleGetTopUsers = async (type, id) => {
    setAnalyticType(ANALYTIC_TYPE.TOP_USERS);
    switch (type) {
      case TYPES.READING_LISTENING:
        setPartId(id);
        break;
      case TYPES.GRAMMAR:
        setGrammarId(id);
        break;
      default:
        throw new Error('Invalid type');
    }
  };

  useEffect(() => {
    if (partId) {
      fetchTopUsersByPart()
        .then((topUsers) => setTopUsers(topUsers))
        .catch((e) => console.error(e));
    }
  }, [partId, quantityOfTopUsers]);

  return (
    <ContentManager
      className={cx('container')}
      isUser={true}
      isEdit={false}
      isAddNew={false}
      isComplete={true}
      headerTitle="Số liệu và phân tích"
      sidebarTitle="Số liệu và phân tích"
      sidebarChildren={
        <div className={cx('sidebar')}>
          <ListGroup className={cx('list-group')}>
            <ListGroup.Item
              className={cx('list-group-item')}
              onClick={() => setAnalyticType(ANALYTIC_TYPE.DATE_AVERAGE)}
            >
              Thời gian thi theo ngày
            </ListGroup.Item>
            <ListGroup.Item>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header className={cx('accordion-header')}>Xếp hạng học viên</Accordion.Header>
                  <Accordion.Body>
                    {/* Reading & Listening */}
                    <Accordion>
                      <Accordion.Header className={cx('accordion-header')}>Reading & Listening</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 1)}
                          >
                            Mô tả tranh
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 2)}
                          >
                            Hỏi đáp
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 3)}
                          >
                            Đoạn hội thoại
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 4)}
                          >
                            Bài nói ngắn
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 5)}
                          >
                            Hoàn thành câu
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 6)}
                          >
                            Hoàn thành đoạn văn
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 7)}
                          >
                            Đọc hiểu - đoạn đơn
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 8)}
                          >
                            Đọc hiểu - đoạn kép
                          </ListGroup.Item>
                          <ListGroup.Item
                            className={cx('list-group-item')}
                            onClick={() => handleGetTopUsers(TYPES.READING_LISTENING, 9)}
                          >
                            Đọc hiểu - đoạn ba
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion>
                    {/* Grammar */}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </ListGroup.Item>
          </ListGroup>
        </div>
      }
      mainChildren={
        <div className={cx('main')}>
          <RenderIf isTrue={analyticType === ANALYTIC_TYPE.DATE_AVERAGE}>
            <DateAverage />
          </RenderIf>
          <RenderIf isTrue={analyticType === ANALYTIC_TYPE.TOP_USERS}>
            <UserRankings
              isLoading={isTopUsersLoading}
              topUsers={topUsers}
              onSelectTopUsers={(quantityOfTopUsers) => setQuantityOfTopUsers(quantityOfTopUsers)}
            />
          </RenderIf>
        </div>
      }
      isEnableBottombar={false}
    />
  );
};

const DateAverage = () => {
  const [data, setData] = useState([]);
  const { getAverageTimePerDay } = hooks.useAnalyticService();

  useEffect(() => {
    const fetchData = async () => {
      getAverageTimePerDay().then((result) => {
        // Format dữ liệu cho Line Chart
        const lineData = [
          {
            id: 'Average Time (m)',
            data: result.map((item) => ({
              x: item.testDate,
              y: Math.ceil(item.averageTime / 60),
              label: `${Math.ceil(item.averageTime / 60)}m`,
            })),
          },
          {
            id: 'User Count',
            data: result.map((item) => ({
              x: item.testDate,
              y: item.userCount,
              label: `${item.userCount}`,
            })),
          },
        ];

        setData(lineData);
      });
    };

    fetchData();
  }, []);

  return (
    <div className={cx('date-average-chart')}>
      <ResponsiveLine
        className={cx('line')}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point', padding: 0.5 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        axisBottom={{
          tickRotation: -45,
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 36,
        }}
        axisLeft={{
          legend: 'Average Time / User Count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemsSpacing: 0,
          },
        ]}
        tooltip={({ point }) => (
          <div
            style={{
              background: '#fff',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <strong>{point.serieId}</strong>
            <br />
            Date: {point.data.xFormatted}
            <br />
            Value: {point.data.yFormatted}
          </div>
        )}
        pointLabel="label"
        pointLabelYOffset={-12}
      />
    </div>
  );
};


export default Analytics;
