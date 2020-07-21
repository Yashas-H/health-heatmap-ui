import React, { createContext, useState, useEffect } from 'react';

export const LayerContext = createContext();
const LayerContextProvider = (props) => {
	const [selectedLayers, setSelectedLayers] = useState([]);

	useEffect(() => {
	}, []);

	return (
		<LayerContext.Provider
			value={{
				selectedLayers: selectedLayers,
				setSelectedLayers: setSelectedLayers,
			}}
		>
			{props.children}
		</LayerContext.Provider>
	);
};

export default LayerContextProvider;
