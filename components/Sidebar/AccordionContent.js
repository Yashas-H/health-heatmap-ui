import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import _ from 'underscore';

import IndicatorItem from './IndicatorItem';

function AccordionContent({ subgroup, name, index, onSelectIndicator }) {
  const [active, setActive] = useState(false);
  const chevron = active ? <ChevronDown /> : <ChevronRight />;
  return (
    <div>
      <li className="sub-group has-border">
        <div onClick={() => setActive(!active)} className="sub-group-header">
          {chevron} {name}
        </div>
        <ul className={`indicators-list ${active ? '':'hidden'}`}>
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
