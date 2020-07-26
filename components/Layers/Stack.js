import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
										>
											<Layer layer={item} dragHandleProps={{ ...provided.dragHandleProps }} />
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
