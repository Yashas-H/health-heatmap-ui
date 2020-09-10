import Head from 'next/head';
import Link from 'next/link';
import { Button, Text, Stack, Box, SimpleGrid, Icon } from '@chakra-ui/core';
import { Link as ScrollLink, Element } from 'react-scroll';

import Layout from '../components/Layout';

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
				<Text padding="12px" maxWidth="800px" marginX="auto" marginTop="20px" textAlign="center">
					This is an alpha version of the health heatmap with the intent of collecting all the public health
					data, curating them based on a data model and deploying them on a map-based open access platform.
				</Text>

				<ScrollLink to="faq" smooth={true} duration={500}>
					<Button variantColor="white" margin="auto" display="block" variant="outline" mt="30px">
						Know More
					</Button>
				</ScrollLink>
			</div>
			<Box maxWidth="1080px" marginX="auto" marginTop={5} paddingX="1rem">
				<Stack>
					<SimpleGrid columns={3} spacing={5} marginY="3rem">
						<Link href="/composite">
							<Box className="link-box-home">
								<Text fontWeight="bold" fontSize="18px">
									Score your district on Health Indicators{' '}
									<Icon name="arrow-forward" color="014491" />
								</Text>
								<Text className="link-text">
									Get an overview of the health status of each district by building a composite index
									from selected health indicators.
								</Text>
							</Box>
						</Link>
						<Link href="/idsp">
							<Box className="link-box-home">
								<Text fontWeight="bold" fontSize="18px">
									Visualize the spread of infectious diseases in India over last 12 years
									<Icon name="arrow-forward" color="014491" />
								</Text>
								<Text className="link-text">
									Get an overview of the health status of each district by building a composite index
									from selected health indicators.
								</Text>
							</Box>
						</Link>
						<Link href="/map">
							<Box className="link-box-home">
								<Text fontWeight="bold" fontSize="18px">
									Deep dive into health indicators of India
									<Icon name="arrow-forward" color="014491" />
								</Text>
								<Text className="link-text">
									Get an overview of the health status of each district by building a composite index
									from selected health indicators.
								</Text>
							</Box>
						</Link>
					</SimpleGrid>
				</Stack>

				<Element name="faq"></Element>
				<Stack spacing={1} marginTop={5}>
					<Text padding="0.4rem" fontWeight="bold" fontSize="1.6rem" marginTop="2rem">
						How how do we collect the data?
					</Text>
					<Text padding="0.4rem">
						The Health HeatMap of India is an attempt to aggregate publicly available health data from
						diverse sources, curate it and warehouse it in a searchable, queryable format and make it
						available on an open access platform with a range of visualizations
					</Text>
					<Text padding="0.4rem">
						Data from various sources like the National Health and Family Survey (NFHS), Annual Health
						Survey (AHS), Sample Registration System (SRS), the Integrated Disease Surveillance Program
						(IDSP) and other sources of public data have been accessed, curated and organized on a data
						model of health indicator - geo entity framework and deployed on the system. Spatial as well as
						tabular visualizations allow viewing and exploration of the data from different perspectives
					</Text>
					<Text padding="0.4rem" fontWeight="bold" fontSize="1.6rem" marginTop="2rem">
						How do we massage the data?
					</Text>
					<Text padding="0.4rem">
						The data on the platform have been extracted, curated and transformed from various sources and
						in various formats. While we have done the first cut at curation, we are putting out the data
						with source attribution for the first time on a public platform for public scrutiny, feedback
						and suggestions. Alternatively : After a first attempt at curation, the data is now available on
						this portal with source attribution for public scrutiny, feedback and suggestions.
					</Text>

					<Text padding="0.4rem" fontWeight="bold" fontSize="1.6rem" marginTop="2rem">
						The Roadmap
					</Text>
					<Text padding="0.4rem">
						This first version of the platform was developed as a part of the precursor grant of National
						Mission on Biodiversity and Human Well-Being (NMBHWB) during the period October 2019 to
						September 2020. It is work ion progress and over time we plan to enrich the portal with more
						data and rich visualizations.
					</Text>
				</Stack>
			</Box>
			<footer>
				<Box textAlign="center" className="home-footer">
					<a href="https://www.metastringfoundation.org/" target="_blank">
						Powered by Metastring
					</a>
				</Box>
			</footer>
		</Layout>
	);
}
