import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import LayerContextProvider from '../context/Layer';

import hhmTheme from './theme';
import '../styles/core.scss';

export default ({ Component, pageProps }) => {
	return (
		<LayerContextProvider>
			<ThemeProvider theme={hhmTheme}>
				<ColorModeProvider>
					<CSSReset />
					<Component {...pageProps} />
				</ColorModeProvider>
			</ThemeProvider>
		</LayerContextProvider>
	);
};
