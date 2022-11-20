import React, { useEffect } from 'react';
import "./style.css"

interface WhiteboardProps {
    tool: string
}

function Whiteboard(props : WhiteboardProps) {

    useEffect(() => {
        if (props.tool === "pencil") {
            console.log("pencil");
            drawWithMouse();
        } else if (props.tool === "rectangle") {
            console.log("rectangle");
            
        } else if (props.tool === "circle") {
            console.log("circle");
            drawCircle();
        }
    });

    function drawCircle() {
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
        context!.strokeStyle = '#FF00FF';

        //current and previous mouse positions for begining and end of line
        var mouseLocation = {x: 0, y: 0};
        var mouseDownLocation = {x: 0, y: 0};
        var mouseUpLocation = {x: 0, y: 0};

        //when the mouse moves this changes the current and old mouse locations
        canvas.addEventListener('mousemove', function(e) {
            mouseLocation.x = e.pageX - this.offsetLeft;
            mouseLocation.y = e.pageY - this.offsetTop;
        }, false);

        //When the user holds the mouse button down it starts the listener and paints
        canvas.addEventListener('mousedown', function(e) {
            mouseDownLocation.x = mouseLocation.x
            mouseDownLocation.y = mouseLocation.y

            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        //when the user releases the mouse button it stops the listener and does not paint
        canvas.addEventListener('mouseup', function() {
            mouseUpLocation.x = mouseLocation.x
            mouseUpLocation.y = mouseLocation.y

            drawFinalCircle();

            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        //when the mousemove eventListener is active this function handles the drawing
        var onPaint = function() {

            var xLocation = (mouseLocation.x + mouseDownLocation.x)/2
            var yLocation = (mouseLocation.y + mouseDownLocation.y)/2
            var xlength = Math.abs(mouseLocation.x - mouseDownLocation.x)
            var ylength = Math.abs(mouseLocation.y - mouseDownLocation.y)

            console.log("xLocation" + xLocation)
            console.log("yLocation" + yLocation)

            console.log("xlength" + xlength)
            console.log("ylength" + ylength)

            console.log("CONTEXT" + context)
            
            
            // Draw the ellipse
            context!.beginPath();
            context!.ellipse(xLocation, yLocation, xlength*0.75, ylength*0.75, 0, 0, 2 * Math.PI);
            context!.stroke();

            //Draw line
            //context!.beginPath();
            //context!.moveTo(mouseDownLocation.x, mouseDownLocation.y);
            //context!.lineTo(mouseLocation.x, mouseLocation.y);
            //context!.stroke();
        };


        var drawFinalCircle = function() {
            var xLocation = (mouseUpLocation.x + mouseDownLocation.x)/2
            var yLocation = (mouseUpLocation.y + mouseDownLocation.y)/2
            var xlength = Math.abs(mouseUpLocation.x - mouseDownLocation.x)
            var ylength = Math.abs(mouseUpLocation.y - mouseDownLocation.y)

            console.log("xLocation" + xLocation)
            console.log("yLocation" + yLocation)

            console.log("xlength" + xlength)
            console.log("ylength" + ylength)
            
            // Draw the ellipse
            context!.beginPath();
            context!.ellipse(xLocation, yLocation, xlength*0.75, ylength*0.75, 0, 0, 2 * Math.PI);
            context!.stroke();
        }
    }

    function drawWithMouse() {
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

    return (
        <div className='canvas-style' id='canvas-style'>
            <canvas className='drawing-board' id="drawing-board"></canvas>
        </div>
    );
}

export default Whiteboard;