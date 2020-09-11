import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Text,
  Stack,
  Box,
  SimpleGrid,
  Icon,
  Link as PageLink,
} from "@chakra-ui/core";
import { Link as ScrollLink, Element } from "react-scroll";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Health Heatmap of India</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero">
        <h1 className="title">
          <p>Health Heatmap of India</p>
        </h1>
        <p className="description">FOR INDIA'S DATA-DRIVEN DECISION MAKING</p>
        <Text
          padding="12px"
          maxWidth="800px"
          marginX="auto"
          marginTop="20px"
          textAlign="center"
        >
          This is an initial version of the Health Heatmap of India, an open
          access platform for aggregation, curation and visualization of Health
          Indicators of India.
        </Text>

        <ScrollLink to="faq" smooth={true} duration={500}>
          <Button
            variantColor="white"
            margin="auto"
            display="block"
            variant="outline"
            mt="30px"
          >
            Know More
          </Button>
        </ScrollLink>
      </div>
      <Box maxWidth="1080px" marginX="auto" marginTop={5} paddingX="1rem">
        <Stack>
          <SimpleGrid columns={3} spacing={5} marginY="3rem">
            <Box className="link-box-home">
              <PageLink href="/map" textDecoration="none">
                <>
                  <Text
                    fontWeight="bold"
                    fontSize="18px"
                    color="#014491"
                    className="box-header-title"
                  >
                    Deep dive into health indicators of India{" "}
                    <Icon name="arrow-forward" color="014491" />
                  </Text>
                  <Text className="link-text">
                    All health indicators along with the geo entity that have
                    been curated can be selected and visualized in a map view
                    and a table view.
                  </Text>
                  <Text>
                    Indicators can be overlaid on the map canvas and can be
                    filtered along other dimensions of the indicator.
                  </Text>
                  <Text>
                    Additional environmental layers like rainfall, vegetation
                    and forest types, from the India Biodiversity Portal can
                    also be overlaid along with the health indicator.
                  </Text>
                  <Text>Explore health indicators of India.</Text>
                </>
              </PageLink>
            </Box>

            <Box className="link-box-home">
              <PageLink href="/composite" textDecoration="none">
                <>
                  <Text
                    fontWeight="bold"
                    fontSize="18px"
                    color="#014491"
                    className="box-header-title"
                  >
                    Explore district health status{" "}
                    <Icon name="arrow-forward" color="014491" />
                  </Text>
                  <Text className="link-text">
                    Get an overview of the health status of each district by
                    building a composite index from selected health indicators
                    from NFHS-4.
                  </Text>

                  <Text>
                    The set of indicators for the district are scaled,
                    normalized and then used to arrive at a composite score for
                    each district. We have used a method inspired from the
                    methodology used by NITI Ayog in creating the Aspirational
                    Districts Program.
                  </Text>
                  <Text>
                    This interactive interface allows the user to select the
                    participant indicators and visualize the composite index on
                    our map view and a sortable table view.
                  </Text>
                  <Text>Explore, build and visualize the composite index.</Text>
                </>
              </PageLink>
            </Box>

            <Box className="link-box-home">
              <PageLink href="/idsp" textDecoration="none">
                <>
                  <Text
                    fontWeight="bold"
                    fontSize="18px"
                    color="#014491"
                    className="box-header-title"
                  >
                    Visualize the spread of infectious diseases in India{" "}
                    <Icon name="arrow-forward" color="014491" />
                  </Text>
                  <Text className="link-text">
                    Reports of infectious diseases are very important for early
                    tracking and management of zoonotic and infectious diseases.
                    This is specially relevant in the context of the current
                    COVID 19 pandemic.
                  </Text>

                  <Text>
                    The Integrated Disease Surveillance Program (IDSP) monitors
                    and reports on the occurrence and spread of infectious
                    diseases across the country.
                  </Text>
                  <Text>
                    The program has been active since 2009 and produces weekly
                    reports on several infectious diseases and their occurrence
                    as PDF documents. Data has been extracted from these PDF
                    documents and with limited curation, we have published them
                    on the portal.
                  </Text>
                  <Text>
                    Explore and visualize the occurrence and trends of
                    infectious diseases across time and geography.
                  </Text>
                </>
              </PageLink>
            </Box>
          </SimpleGrid>
        </Stack>

        <Element name="faq"></Element>
        <Stack spacing={1} marginTop={5}>
          <Text
            padding="0.4rem"
            fontWeight="bold"
            fontSize="1.6rem"
            marginTop="2rem"
          >
            How do we collect the data?
          </Text>
          <Text padding="0.4rem">
            The Health Heatmap of India is an attempt to aggregate publicly
            available health data from diverse sources, curate it and warehouse
            it in a searchable, queryable format and make it available on an
            open access platform with a range of visualizations.
          </Text>
          <Text padding="0.4rem">
            Data from various sources like the National Health and Family Survey
            (NFHS), Annual Health Survey (AHS), Sample Registration System
            (SRS), the Integrated Disease Surveillance Program (IDSP) and other
            sources of public data have been accessed, curated and organized on
            a data model of health indicator - geo entity framework and deployed
            on the system. Spatial as well as tabular visualizations allow
            viewing and exploration of the data from different perspectives.
          </Text>
          <Text
            padding="0.4rem"
            fontWeight="bold"
            fontSize="1.6rem"
            marginTop="2rem"
          >
            How do we curate the data?
          </Text>
          <Text padding="0.4rem">
            The data on the platform have been extracted from various sources
            and in various formats. After a first attempt at curation, the data
            is now available on this portal with source attribution for public
            scrutiny, feedback and suggestions.
          </Text>

          <Text
            padding="0.4rem"
            fontWeight="bold"
            fontSize="1.6rem"
            marginTop="2rem"
          >
            The Roadmap
          </Text>
          <Text padding="0.4rem">
            This first version of the platform was developed as a part of the
            preparatory phase project of the National Mission on Biodiversity
            and Human Well-Being from October 2019 to September 2020. It is work
            in progress and over time we plan to enrich the portal with more
            data and rich visualizations.
          </Text>
        </Stack>
      </Box>
      <footer>
        <Box textAlign="center" className="home-footer">
          <a href="https://www.metastringfoundation.org/" target="_blank">
            Developed by Metastring Foundation
          </a>
        </Box>
      </footer>
    </Layout>
  );
}
