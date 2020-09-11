import { useIndicators } from 'context/hhm-data';
import { groupBy, contains, map, range } from 'underscore';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel, Checkbox, Skeleton, Box } from '@chakra-ui/core';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/core';
export default function Sidebar({ relevantDataFilter, filter, dispatchFilter }) {
	const { indicatorsLoading, indicatorsError, indicators } = useIndicators({
		filter: relevantDataFilter,
	});

	if (indicatorsError) {
		return <div>An Error: {indicatorsError.message}</div>;
	}
	const groupedIndicators = groupBy(indicators, (i) => i['indicator.Category']);

	const LoadingSkeleton = () => {
		return map(range(5), (i) => {
			return (
				<Box mx="20px" py="10px" width="70%" key={i}>
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="16px" mb="5px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="12px" mb="5px" mr="10%" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="12px" mb="20px" mr="30%" />
				</Box>
			);
		});
	};

	return (
		<>
			<Tabs>
				<TabList>
					<Tab>
						<Text fontWeight="bold" mt="8px">
							Indicators
						</Text>
					</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						{!indicatorsLoading ? (
							<Accordion allowToggle>
								{Object.entries(groupedIndicators).map(([key, value]) => (
									<AccordionItem key={key}>
										<AccordionHeader>{key}</AccordionHeader>
										<AccordionPanel>
											{value.map((v) => (
												<Checkbox
													key={v}
													value={v['indicator.id']}
													onChange={(e) => {
														if (e.target.checked) {
															dispatchFilter({
																type: 'add-term',
																payload: ['indicator.id', v['indicator.id']],
															});
														} else {
															dispatchFilter({
																type: 'remove-term',
																payload: ['indicator.id', v['indicator.id']],
															});
														}
													}}
													defaultIsChecked={contains(
														filter?.terms?.['indicator.id'],
														v['indicator.id']
													)}
												>
													{v['indicator.Name']}
												</Checkbox>
											))}
										</AccordionPanel>
									</AccordionItem>
								))}
							</Accordion>
						) : (
							LoadingSkeleton()
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
}
