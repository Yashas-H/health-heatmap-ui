import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button, Text, Stack, Box } from "@chakra-ui/core";

import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Health Heatmap of India - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        maxWidth="1080px"
        marginX="auto"
        marginTop={5}
        paddingX="1rem"
        className="about-container"
      >
        <Text fontSize="4xl" paddingY="18px">
          About
        </Text>
        <Box className="about-content">
          <Text>
            The HHM Project has been initiated as a part of the preparatory
            phase project of the National Mission on Biodiversity and Human
            Well-Being which was catalysed and supported by the Office of the
            Principal Scientific Adviser to the Government of India.
          </Text>
          <Text>
            We believe open access to public health data would help in
            encouraging citizen engagement and data-driven planning and
            development for better human health. The current pandemic has also
            exposed the need for reliable and accessible databases on health,
            settlements and human communities to efficiently deliver relevant
            and reliable health information to citizens. With the current
            emphasis on digital health, such open datasets would be a
            significant contribution to the objective of One Health.
          </Text>
          <Text>
            Towards the objective of building an open access health heatmap, our
            team surveyed public health data available in India and various
            national and international platforms on public health. They evolved
            a health indicator - geo entity data model and designed a flexible
            data store to aggregate multidimensional health data.
          </Text>
          <Text>
            This first version has been deployed for public review, comments and
            feedback.
          </Text>
          <Text>
            The project has been executed by{" "}
            <a
              href="https://www.metastringfoundation.org/"
              target="_blank"
              className="ext-link"
            >
              Metastring Foundation
            </a>
            , a not-for-profit entity and part of the Biodiversity
            Collaborative. The main focus of the Foundation is to build open
            data platforms in various sectors where it can be used for public
            good and to drive policy and action.
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}
