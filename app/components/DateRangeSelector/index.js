import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import './styles.scss';

function DateRangeSelector() {
  const [date, setDate] = useState([new Date(), new Date()],);

  return (
    <DateRangePicker
        onChange={date => setDate(date)}
        value={date}
    />
  );
}

export default DateRangeSelector;