import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Text } from '@chakra-ui/core';

import Layer from './Layer';

// fake data generator
const getItems = (count) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k}`,
		content: `item ${k}`,
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
	// change background colour if dragging
	background: isDragging ? '#0000007a' : 'white',
	borderBottom: '1px solid #dedede',
	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'white',
});

function LayerStack({ layers, updateLayerOrder }) {
	const [items, setItems] = useState({});

	useEffect(() => {
		setItems(_.map(layers, (l, k) => layers[k]));
	}, [layers]);

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}
		const newItems = reorder(items, result.source.index, result.destination.index);
		setItems(newItems);
		updateLayerOrder(newItems);
	};

	const handleDuplicateLayer = (layer, layerIndex) => {
		const newItems = items;
		newItems.splice(layerIndex, 0, {
			...layer,
			id: `${layer.__id}-DUPE`,
			__id: `${layer.__id}-DUPE`,
			indicator: { ...layer.indicator, id: `${layer.__id}-DUPE` },
			styles: {
				...layer.styles,
				__id: `${layer.__id}-DUPE`,
				colors: { ...layer.styles.colors, id: `${layer.__id}-DUPE`, source: `${layer.__id}-DUPE` },
			},
		});
		updateLayerOrder(JSON.parse(JSON.stringify(newItems)));
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{!_.isEmpty(items) && (
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{_.map(items, (item, index) => (
								<Draggable key={`layer-${item.id}`} draggableId={`layer-${item.id}`} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
										>
											<Layer
												layer={item}
												layerIndex={index}
												dragHandleProps={{ ...provided.dragHandleProps }}
												onDuplicateLayer={handleDuplicateLayer}
												isIbp={item.isIbp}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			)}
		</DragDropContext>
	);
}
export default LayerStack;
