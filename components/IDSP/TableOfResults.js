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
  return list.map(row => ({
    ...row,
    [field]: parseInt(row[field], 10)
  }))
}

const displaySelected = (list) => {
  const headers = [
    {id: "meta.original.report_id", name: "Report ID"},
    {id: "diagnosis.Name", name: "Disease"},
    {id: "source.id", name: "Source"},
    {id: "meta.original.countOf", name: "Cases/Deaths"},
    {id: "duration.start", name: "Report date"},
    {id: "entity.State", name: "State"},
    {id: "entity.Name", name: "District"},
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
