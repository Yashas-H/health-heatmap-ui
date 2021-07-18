import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/core";
import Link from "./Link";

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
        padding="0"
        bg="#1D75D9"
        color="#ffffff"
        {...props}
      >
        <Flex align="center" mr={5} padding="1rem">
          <Heading as="h1" size="lg" letterSpacing="-.05rem">
            <Link href="/">
              <a href="#">
                Health Heatmap 
                {' '}
                <sup className="title-sup">beta</sup>
              </a>
            </Link>
          </Heading>
        </Flex>

        <Box
          display={{ base: "block", md: "none" }}
          className="header-burger"
          onClick={handleToggle}
        >
          <svg
            fill="black"
            width="18px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        />

        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          mt={{ base: 4, md: 0 }}
          flexGrow={1}
          width={{ sm: "full", md: "auto" }}
          justifyContent="flex-end"
          className="menu-links"
        >
          <MenuItems>
            <Link href="/">
              <a>Home</a>
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="/map">
              <a>Deep Dive</a>
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="/karnataka">
              <a>Karnataka Covid Data</a>
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="/composite">
              <a>Composite Index</a>
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="/idsp">
              <a>Infectious Diseases</a>
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="/about">
              <a>About</a>
            </Link>
          </MenuItems>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
