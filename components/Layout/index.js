import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import Header from './Header';

export default ({ page, children }) => {
	return (
		<div>
			<Head>
				<title>Health Heatmap</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			{/*
			 * The approach used here demonstrates how to avoid a flash of incorrect
			 * content on the initial load of pages, while working on pages that
			 * support server side rendering for clients without JavaScript.
			 */}
			<noscript>
				<style>{`.js-hidden { opacity: 1 !important; }`}</style>
			</noscript>

			<header>
				<Header />
			</header>
			{children}
			{/* <footer className="footer">
        <div className="content has-text-centered">
          <span>Powered By Metastring</span>
        </div>
      </footer> */}
		</div>
	);
};
