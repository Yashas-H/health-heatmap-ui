import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import hhmTheme from '../styles/theme';
import '../styles/core.scss';

export default ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={hhmTheme}>
				<CSSReset />
				<Component {...pageProps} />
		</ThemeProvider>
	);
};
