import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import LayerContextProvider from '../context/Layer';
import '../styles/core.scss';

export default ({ Component, pageProps }) => {
	return (
		<LayerContextProvider>
			<ThemeProvider>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</LayerContextProvider>
	);
};
