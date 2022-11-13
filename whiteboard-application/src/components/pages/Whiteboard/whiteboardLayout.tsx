import React, {useState} from 'react';
import './style.css';
import Whiteboard from '../../Whiteboard/whiteboard';

function WhiteboardLayout() {
    const [selectedTool, setSelectedTool] = useState("pencil");

    return (
        <div className="whiteboard-container">
            <div className='toolbar'>
                <button onClick={() => setSelectedTool("pencil")}>Pencil</button>
                <button onClick={() => setSelectedTool("rectangle")}>Rectangle</button>
                <button onClick={() => setSelectedTool("circle")}>Circle</button>
                <p>{selectedTool}</p>
            </div>
            <div className="drawing-section">
                <Whiteboard tool={selectedTool}></Whiteboard>
            </div>
        </div>
    );
}

export default WhiteboardLayout;