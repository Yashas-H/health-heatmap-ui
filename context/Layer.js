import React, { createContext, useState, useEffect } from 'react';

export const LayerContext = createContext();
const LayerContextProvider = (props) => {
	const [selectedLayers, setSelectedLayers] = useState([]);
	const [layerLoading, setLayerLoading] = useState(false);

	useEffect(() => {
	}, []);

	return (
		<LayerContext.Provider
			value={{
				selectedLayers: selectedLayers,
				setSelectedLayers: setSelectedLayers,
				layerLoading: layerLoading,
				setLayerLoading: setLayerLoading,
			}}
		>
			{props.children}
		</LayerContext.Provider>
	);
};

export default LayerContextProvider;
