import { useTable } from 'react-table';
import _ from 'underscore';

function DataGrid({ IndicatorData }) {
	console.log('data', IndicatorData);

	const data = _.map(IndicatorData.district || IndicatorData.state, (item, name) => {
		return {
			region: name,
			value: item[0].value,
			distCode: item[0]['entity.DistCode'],
			state: item[0]['entity.state'],
			settlement: item[0]['settlement'],
		};
	});

	const columns = React.useMemo(
		() => [
			{
				Header: 'Region',
				accessor: 'region', // accessor is the "key" in the data
			},
			{
				Header: 'Value',
				accessor: 'value',
			},
			{
				Header: 'District Code',
				accessor: 'distCode',
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

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<table {...getTableProps()} style={{ fontSize: '14px', marginTop: '12px', width: 'calc(100% - 5px)' }}>
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
								}}
							>
								{column.render('Header')}
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
	);
}
export default DataGrid;
