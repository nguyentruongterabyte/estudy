import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ResizeablePanels.module.scss';

const cx = classNames.bind(styles);

const ResizeablePanels = ({ leftChildren, rightChildren, className }) => {
  const [leftWidth, setLeftWidth] = useState(528); // initial left panel width
  const isDragging = useRef(false);
  const startX = useRef(0); // save the initial mouse poisition
  const initialWidth = useRef(0); // initial width of left panel

  const startResize = (e) => {
    isDragging.current = true;
    startX.current = e.clientX; // save mouse poisition when dragging starts
    initialWidth.current = leftWidth; // save the initial width of the left section
    document.body.style.cursor = 'ew-resize';
    document.body.classList.add('no-select');
  };

  const stopResize = (e) => {
    isDragging.current = false;
    document.body.style.cursor = 'default';
    document.body.classList.remove( 'no-select' );
  };

  const handleResize = (e) => {
    if (isDragging.current) {
      const newWidth = initialWidth.current + (e.clientX - startX.current); // Caculate the new width
      setLeftWidth(newWidth); // update the width of the left panel
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, []);

  return (
    <div className={cx('container', className)}>
      <div className={cx('left-panel')} style={{ width: `${leftWidth}px` }}>
        {leftChildren}
      </div>
      <div className={cx('resizer')} onMouseDown={startResize}></div>
      <div className={cx('right-panel')}>{rightChildren}</div>
    </div>
  );
};

export default ResizeablePanels;
