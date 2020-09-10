import React, { useState, useEffect, useContext } from 'react';
import _ from 'underscore';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Box, Stack, Text, Skeleton } from '@chakra-ui/core';

function SelectedShow({filter}) {
    const selectedIndicators = filter?.terms?.["indicator.id"]
	const [active, setActive] = useState(true);

	return (
		<Box className="layer-container" fontSize="12px" fontWeight="300" width={active ? '400px' : '140px'}>
			{active ? (
				<Box>
					<Box className="layer-close" onClick={(e) => setActive(false)}>
						<ArrowDown size="18px" />
					</Box>
					<Stack className="layer-stack" marginTop="-28px">
						<Stack className="layer-loading-stack">
							{_.map(selectedIndicators, (indicator) => (
								<Stack
									key={indicator}
									spacing="5px"
									padding="10px 10px"
									fontSize="13px"
									fontWeight="bold"
									className="layer-item"
								>
                                    <Text>{indicator}</Text>
								</Stack>
							)).reverse()}
						</Stack>
					</Stack>
				</Box>
			) : (
				<Box>
					<Box
						spacing={2}
						className="header-title"
						isInline
						cursor="pointer"
						padding="6px"
						onClick={(e) => setActive(true)}
					>
						<Stack isInline spacing={2} mt="5px" justifyContent="space-between">
							<Stack isInline>
								<ArrowUp size="18px" />
								<Text ml="6px">INDICATORS INCLUDED</Text>
							</Stack>
							<Text className="count-badge">{_.keys(selectedIndicators).length}</Text>
						</Stack>
					</Box>
				</Box>
			)}
		</Box>
	);
}

export default SelectedShow;
