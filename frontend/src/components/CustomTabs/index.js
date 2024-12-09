import classNames from 'classnames/bind';
import styles from './CustomTabs.module.scss';
import { Tab, Tabs, TabContainer } from 'react-bootstrap';

const cx = classNames.bind(styles);

const CustomTabs = ({ className, items = [], defaultActiveKey }) => {
  const renderTabs = () =>
    items.map((item, index) => (
      <Tab eventKey={item.eventKey} title={item.title} key={index}>
        {item.content}
      </Tab>
    ));

  return (
    <TabContainer defaultActiveKey={defaultActiveKey}>
      <Tabs className={cx('container', 'mb-3', className)}>{renderTabs()}</Tabs>
    </TabContainer>
  );
};

export default CustomTabs;
