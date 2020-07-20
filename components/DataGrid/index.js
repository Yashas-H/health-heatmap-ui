import { useTable } from 'react-table';
import _ from 'underscore';
import { Box } from '@chakra-ui/core';

function DataGrid({ IndicatorData, type }) {
	let data = [];

	const columnsState = React.useMemo(
		() => [
			{
				Header: type,
				accessor: 'region', // accessor is the "key" in the data
			},
			{
				Header: 'Value',
				accessor: 'value',
			},
			{
				Header: type + ' Code',
				accessor: 'code',
			},
			{
				Header: 'Settlement',
				accessor: 'settlement',
			},
		],
		[]
	);
	const columnsDist = React.useMemo(
		() => [
			{
				Header: type,
				accessor: 'region', // accessor is the "key" in the data
			},
			{
				Header: 'Value',
				accessor: 'value',
			},
			{
				Header: type + ' Code',
				accessor: 'code',
			},
			{
				Header: 'State',
				accessor: 'state',
			},
			{
				Header: 'Settlement',
				accessor: 'settlement',
			},
		],
		[]
	);

	switch (type) {
		case 'state':
			data = _.map(IndicatorData, (item, name) => {
				return {
					region: name,
					value: item[0].value,
					settlement: item[0]['settlement'],
				};
			});
			break;
		case 'district':
			data = _.map(IndicatorData, (item, name) => {
				return {
					region: name,
					value: item[0].value,
					code: item[0]['entity.DistCode'],
					state: item[0]['entity.state'],
					settlement: item[0]['settlement'],
				};
			});
			break;
		default:
			break;
	}
	const columns = type === 'state' ? columnsState : columnsDist;
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<Box className="table-box" mb="100px">
			<table {...getTableProps()} style={{ fontSize: '14px', marginTop: '12px', width: '66%' }}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps()}
									style={{
										borderBottom: 'solid 3px #3182ce',
										background: 'aliceblue',
										color: 'black',
										fontWeight: 'bold',
										textTransform: 'capitalize',
									}}
								>
									{column.render('Header')}
									{/* Add a sort direction indicator */}
									{/* <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span> */}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											style={{
												padding: '5px',
												border: 'solid 1px #ccc',
												background: '#fff',
											}}
										>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Box>
	);
}
export default DataGrid;
