import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import Wrapper from '~/components/Popper/Wrapper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const Menu = ({ className, children, items = [], onChange = defaultFn, hideOnClick = false }) => {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () =>
    current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });

  return (
    <span className={cx('container', className)}>
      <Tippy
        trigger="click"
        placement="bottom-end"
        offset={[12, 8]}
        interactive
        delay={[0, 700]}
        hideOnClick={hideOnClick}
        onHide={() => setHistory((prev) => prev.slice(0, 1))}
        render={(attrs) => (
          <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper className={cx('menu-popper')}>
              {history.length > 1 && (
                <Header
                  title={current.title}
                  onBack={() => {
                    setHistory((prev) => prev.slice(0, prev.length - 1));
                  }}
                />
              )}
              <div className={cx('menu-body')}>{renderItems()}</div>
            </Wrapper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </span>
  );
};

export default Menu;
