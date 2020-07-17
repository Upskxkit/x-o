import React, {memo} from 'react';
import PropTypes from 'prop-types';
import "./Cell.css";
import {mark} from "../helpers";

const Cell = ({value, onClick}) => {
  const label = mark(value);

  return (
    <div className={`board-cell ${label}`} onClick={onClick}>
      {label}
    </div>
  );
};

Cell.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default memo(Cell);
