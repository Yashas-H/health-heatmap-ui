import React, { useState } from 'react';
import { Menu } from 'react-feather';
import classNames from 'classnames';

import './style.scss';

function Accordion() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <ul className="tree-list">
        <li>
          <span className="caret">Beverages</span>
          <ul className="nested">
            <li>Water</li>
            <li>Coffee</li>
            <li>
              <span className="caret">Tea</span>
              <ul className="nested">
                <li>Black Tea</li>
                <li>White Tea</li>
                <li>
                  <span className="caret">Green Tea</span>
                  <ul className="nested">
                    <li>Sencha</li>
                    <li>Gyokuro</li>
                    <li>Matcha</li>
                    <li>Pi Lo Chun</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Accordion;
