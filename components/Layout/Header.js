import React from 'react';
import Link from 'next/link';
import { Box, Heading, Flex, Text } from '@chakra-ui/core';

const MenuItems = ({ children }) => (
	<Text mt={{ base: 4, md: 0 }} mr={6} display="block">
		{children}
	</Text>
);

const Header = (props) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);

	return (
		<Box className="nav">
			<Flex
				as="nav"
				align="center"
				justify="space-between"
				wrap="wrap"
				padding="1rem"
				bg="white"
				color="#5d5d5d"
				{...props}
			>
				<Flex align="center" mr={5}>
					<Heading as="h1" size="lg" letterSpacing={'-.05rem'}>
						<Link href="/">
							<a href="#">Health Heatmap</a>
						</Link>
					</Heading>
				</Flex>

				<Box display={{ base: 'block', md: 'none' }} className="header-burger" onClick={handleToggle}>
					<svg fill="black" width="18px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</Box>

				<Box
					display={{ sm: show ? 'block' : 'none', md: 'flex' }}
					width={{ sm: 'full', md: 'auto' }}
					alignItems="center"
					flexGrow={1}
				></Box>

				<Box
					display={{ sm: show ? 'block' : 'none', md: 'flex' }}
					mt={{ base: 4, md: 0 }}
					flexGrow={1}
					width={{ sm: 'full', md: 'auto' }}
					justifyContent={'flex-end'}
				>
					<MenuItems>
						<Link href="/">
							<a href="#">Home</a>
						</Link>
					</MenuItems>
					<MenuItems>
						<Link href="/map">
							<a href="#">Map</a>
						</Link>
					</MenuItems>
					<MenuItems>Dashboards</MenuItems>
					<MenuItems>About Us</MenuItems>
					<MenuItems>Get Involved</MenuItems>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
