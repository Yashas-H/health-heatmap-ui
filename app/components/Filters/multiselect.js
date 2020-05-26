import React, { useState } from 'react';
import _ from 'underscore';

import './styles.scss';

function MultiSelect({filters, title}) {
  const [panel, setPanel] = useState({
    active: false,
  });
  return (
    <div className="filter-block-container">
        <h2 className="filter-type-title">
          <input
              type="checkbox"
              className="select-all-filter-checkbox"
              id={`${title}indicatorField`}
            />
            <label className="label-inline" htmlFor={`${title}indicatorField`}>
              <span className="filter-item-title">{title}</span>
            </label>
        </h2>
        <ul className="filter-list">
          {
            _.map(filters, (filter, index) => {
              return <li key={index}>
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        id={`${title}indicatorField${index}`}
                      />
                      <label className="label-inline" htmlFor={`${title}indicatorField${index}`}>
                        <span className="filter-item-title">{filter}</span>
                      </label>
                    </li>
            })
          }
        </ul>
    </div>
  );
}

export default MultiSelect;
