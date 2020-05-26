import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import _ from 'underscore';

import './style.scss';
import IndicatorItem from './IndicatorItem';

function AccordionContent({ subgroup, name, index, onSelectIndicator }) {
  const [active, setActive] = useState(false);
  const chevron = active ? <ChevronDown /> : <ChevronRight />;
  return (
    <div>
      <li className="sub-group">
        <div onClick={() => setActive(!active)}>
          {chevron} {name}
        </div>
        <ul className="indicators-list">
          {active &&
            _.map(subgroup, (indicator, index) => (
              <IndicatorItem indicator={indicator} index={index} key={index}
                onSelectIndicator={onSelectIndicator}/>
            ))}
        </ul>
      </li>
    </div>
  );
}

export default AccordionContent;
