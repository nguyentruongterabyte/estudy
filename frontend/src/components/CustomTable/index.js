import classNames from 'classnames/bind';
import styles from './CustomTable.module.scss';
import { Table } from 'react-bootstrap';

const cx = classNames.bind(styles);

const CustomTable = ({ headerTitles = [], bodyRows = [], ...props }) => {
  return (
    <Table className={cx('container')} {...props}>
      <thead>
        <tr>
          {headerTitles.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row, index) => (
          <tr key={index}>
            {row.map((column, cIndex) => (
              <td key={cIndex}>{column}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
