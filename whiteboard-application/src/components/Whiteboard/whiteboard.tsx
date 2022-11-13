import React from 'react';
import "./style.css"

interface WhiteboardProps {
    tool: string
}

class Whiteboard extends React.Component<WhiteboardProps> {

    constructor(props: WhiteboardProps) {
        super(props);
    }

    componentDidMount() {
        console.log("pencil");
        this.drawWithMouse();
    }

    componentDidUpdate() {
        if (this.props.tool === "pencil") {
            console.log("pencil");
            this.drawWithMouse();
        } else if (this.props.tool === "rectangle") {
            console.log("rectangle");
        } else if (this.props.tool === "circle") {
            console.log("circle");
        }
    }

    drawWithMouse() {
        var canvas = document.getElementById('drawing-board') as HTMLCanvasElement;
        var context = canvas.getContext('2d');

        var canvasDiv = document.getElementById('canvas-style');
        var canvasDivStyle = getComputedStyle(canvasDiv!);
        canvas.width = parseInt(canvasDivStyle.getPropertyValue('width'));
        canvas.height = parseInt(canvasDivStyle.getPropertyValue('height'));

        //line settings for what the line looks like when drawn with mouse
        context!.lineWidth = 3;
        context!.lineJoin = 'bevel';
        context!.lineCap = 'round';
        context!.strokeStyle = 'black';

        //current and previous mouse positions for begining and end of line
        var mouseLocation = {x: 0, y: 0};
        var previousMouseLocation = {x: 0, y: 0};

        //when the mouse moves this changes the current and old mouse locations
        canvas.addEventListener('mousemove', function(e) {
            previousMouseLocation.x = mouseLocation.x;
            previousMouseLocation.y = mouseLocation.y;

            mouseLocation.x = e.pageX - this.offsetLeft;
            mouseLocation.y = e.pageY - this.offsetTop;
        }, false);

        //When the user holds the mouse button down it starts the listener and paints
        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        //when the user releases the mouse button it stops the listener and does not paint
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        //when the mousemove eventListener is active this function handles the drawing
        var onPaint = function() {
            context!.beginPath();
            context!.moveTo(previousMouseLocation.x, previousMouseLocation.y);
            context!.lineTo(mouseLocation.x, mouseLocation.y);
            context!.closePath();
            context!.stroke();
        };
    }

    render() {
        return (
            <div className='canvas-style' id='canvas-style'>
                <canvas className='drawing-board' id="drawing-board"></canvas>
            </div>
        )
    }
}

export default Whiteboard;