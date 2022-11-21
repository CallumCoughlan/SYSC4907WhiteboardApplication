import React, {useState} from 'react';
import './style.css';
import Whiteboard from '../../Whiteboard/whiteboard';

function WhiteboardLayout() {
    const [selectedTool, setSelectedTool] = useState("pencil");

    function handleToolClick(tool: string) {
        var toolItem = document.getElementById(tool);
        if (toolItem != null) {
            toolItem.style.backgroundColor = "lightgray";

            if (tool != selectedTool) {
                toolItem = document.getElementById(selectedTool);
                if (toolItem != null) {
                    toolItem.style.backgroundColor = "white";
                }
            }
        }

        setSelectedTool(tool);
    }

    return (
        
        <div className="whiteboard-container">
            <h1>selectedTool is {selectedTool}!</h1>
            <div className='toolbar'>
                <div className="toolbar-item" id="pencil" onClick={() => handleToolClick("pencil")}></div>
                <div className="toolbar-item" id="rectangle" onClick={() => handleToolClick("rectangle")}></div>
                <div className="toolbar-item" id="circle" onClick={() => handleToolClick("circle")}></div>
            </div>
            <div className="drawing-section">
                hello
                <Whiteboard tool={selectedTool}></Whiteboard>
                world
            </div>
        </div>
    );
}

export default WhiteboardLayout;