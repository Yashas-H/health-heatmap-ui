import React, { useState } from 'react';
import { Heart } from 'react-feather';
import classNames from 'classnames';

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
          id={`indicatorField${index}_${indicator.indicator_universal_name}`}
          onChange={e => onSelectIndicator(indicator, event.target.checked)}
        />
        <label
          className="label-inline"
          htmlFor={`indicatorField${index}_${
            indicator.indicator_universal_name
          }`}
        >
          <span className="indicator-title">
            {indicator.indicator_universal_name}
          </span>
        </label>
      </span>
    </li>
  );
}

export default IndicatorItem;
