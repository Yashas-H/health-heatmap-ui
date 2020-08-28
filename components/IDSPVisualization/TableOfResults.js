import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { getUniqueKeysOf, ensureKeys } from '../../helper/listUtils';

const displayEverything = (list) => {
  const headers = getUniqueKeysOf(list)
  const columns = headers.map(h => ({
    name: h,
    selector: row => row[h],
    sortable: true
  }))
  const cleanResults = ensureKeys(headers, list);
  return {headers, columns, cleanResults}
}

const convertToNumber = (list, field) => {
  return list.map(row => {
    row[field] = parseInt(row[field], 10)
    return row
  })
}

const displaySelected = (list) => {
  const headers = [
    {id: "report_id", name: "Report ID"},
    {id: "indicator_normalized", name: "Indicator"},
    {id: "source", name: "Source"},
    {id: "countOf", name: "Cases/Deaths"},
    {id: "duration.start", name: "Report date"},
    {id: "entity.state", name: "State"},
    {id: "entity.district", name: "District"},
    {id: "value", name: "Value"}
  ]
  const columns = headers.map(h => ({
    name: h.name,
    selector: row => row[h.id],
    sortable: true,
  }));
  let cleanResults = ensureKeys(headers, list);
  cleanResults = convertToNumber(list, "value");
  return {headers, columns, cleanResults}
}

export default function TableOfResults({ results, everything }) {
  const {headers, columns, cleanResults} = everything ? displayEverything(results) : displaySelected(results);
  return (
    <DataTable
      title="Result"
      columns={columns}
      data={cleanResults}
      keyField="_id"
    />
  );
}

TableOfResults.defaultProps = {
  results: [{ loading: 'loading' }],
};

TableOfResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
};
