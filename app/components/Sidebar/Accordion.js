import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import _ from 'underscore';

import './style.scss';
import AccordionContent from './AccordionContent';

function Accordion({ group, index, onSelectIndicator }) {
  const [active, setActive] = useState(false);
  const chevron = active ? <ChevronDown /> : <ChevronRight />;

  return (
    <div>
      <ul className="accordion-container">
        <div className="accordion-header" onClick={() => setActive(!active)}>
          {chevron} {group.name}
        </div>
        {active &&
          _.map(group.subs, (sub, key) => (
            <li className="sub-group" key={key}>
              <AccordionContent subgroup={sub} name={key} key={key} onSelectIndicator={onSelectIndicator}/>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Accordion;
