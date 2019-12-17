import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DehazeIcon from '@material-ui/icons/Dehaze';
const getItems = () =>
    Array.from({ length: 5}, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
        isSelected:false
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const DraggableList = props => {

    const [items, setItems] = useState( getItems());
    const [isMouseOnElement ,setIsMouseOnElement] = useState(false)

    const onDragEnd = (result)=> {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index,
        );

        setItems(reorderedItems)
    }

    const onSelectElement = (index) => {
        const newItem = Array.from(items);
        newItem.map(item => {
            if(item.id === index){
                item.isSelected = true;
            }
        });
        setItems(newItem)
    };

    const onDeselectElement = (index) => {
        const newItem = Array.from(items);
        newItem.map(item => {
            if(item.id === index){
                item.isSelected = false;
            }
        });
        setItems(newItem)
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        className="ProfileContentList"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index} >
                                {(provided, snapshot) => (
                                    <div
                                        className="ProfileListItem"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onMouseEnter={()=>onSelectElement(item.id)}
                                        onMouseDown={()=>onSelectElement(item.id)}
                                        onMouseLeave={()=>onDeselectElement(item.id)}
                                    >
                                        <div style={{visibility:true}} className="DragLabel">
                                            <DehazeIcon/>
                                        </div>
                                        <div className="DragContent">
                                            <h1>What is your favorite color?</h1>
                                            <p>Green</p>
                                        </div>
                                        <div style={{visibility:item.isSelected?"visible":"hidden"}} className="ListItemEditLabel">
                                            <p>Edit</p>
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
};
export default DraggableList;