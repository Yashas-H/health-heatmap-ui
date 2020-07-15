import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import '../styles/core.scss';

export default ({ Component, pageProps }) => {
	return (
		<ThemeProvider>
			<CSSReset />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};
