import React, { useState } from 'react';
import Draggable from 'react-draggable';
import _ from 'underscore';
import { X } from 'react-feather';
import classNames from 'classnames';

import states from '../../data/states.json';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';

const settlement = ['Rural', 'Urban', 'Any'];
const caste = ['SC', 'ST', 'OBC', 'General', 'Others'];
const gender = ['Male', 'Female', 'Other'];

function Filters() {
  const [panel, setPanel] = useState({
    active: false,
  });

  return (
    <Draggable handle=".handle" position={null}>
      <div className={classNames('filters-panel', panel.active ? '':'minimized')}>
        <h2 className="filter-title handle" onClick={e=>{if(!panel.active) setPanel({...panel, active:true})}}>
          Filters{' '}
          <span className={classNames('close-btn', panel.active ? '':'hidden')}>
            <X onClick={e=>setPanel({...panel, active:!panel.active})}/>
          </span>
        </h2>
        <div className={classNames('filters-block', panel.active ? '':'hidden')}>
          <SingleSelect title='Settlement' filters={settlement}/>
          <SingleSelect title='Caste' filters={caste}/>
          <SingleSelect title='Gender' filters={gender}/>
          <MultiSelect title='State/District' filters={_.map(states, state => state.name)}/>
        </div>
      </div>
    </Draggable>
  );
}

export default Filters;
