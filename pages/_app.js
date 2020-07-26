import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import hhmTheme from './theme';
import '../styles/core.scss';

export default ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={hhmTheme}>
			<ColorModeProvider>
				<CSSReset />
				<Component {...pageProps} />
			</ColorModeProvider>
		</ThemeProvider>
	);
};
