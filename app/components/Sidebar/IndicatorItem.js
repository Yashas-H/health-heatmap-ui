import React, { useState } from 'react';
import { Heart } from 'react-feather';
import classNames from 'classnames';

import './style.scss';

function IndicatorItem({ indicator, index, onSelectIndicator }) {
  const [isFavorite, setFavorite] = useState(false);
  return (
    <li className="indicator-item">
      <span
        className={classNames('fav-icon', isFavorite ? 'active' : '')}
        onClick={() => setFavorite(!isFavorite)}
      >
        <Heart />
      </span>
      <span>
        <input
          type="checkbox"
          className="indicator-checkbox"
          id={`indicatorField${index}_${indicator.id}`}
          onChange={e => onSelectIndicator(indicator, event.target.checked)}
        />
        <label className="label-inline" htmlFor={`indicatorField${index}_${indicator.id}`}>
          <span className="indicator-title">{indicator.canonicalName}</span>
        </label>
      </span>
    </li>
  );
}

export default IndicatorItem;
