import React from 'react';
import Whiteboard from '../Whiteboard/whiteboard';

class WhiteboardLayout extends React.Component {

    render() {
        return (
            <div className="whiteboard-container">
                <div className="drawing-section">
                    <Whiteboard></Whiteboard>
                </div>
            </div>
        )
    }
}

export default WhiteboardLayout;