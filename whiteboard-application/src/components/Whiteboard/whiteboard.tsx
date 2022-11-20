import React, { useEffect } from 'react';
import { fabric } from "fabric"
import "./style.css"
import { Color } from 'fabric/fabric-impl';

interface WhiteboardProps {
    tool: string
}

const className = 'drawing-board';

function Whiteboard(props: WhiteboardProps) {

    useEffect(() => {
        const whiteboard = new fabric.Canvas(className, { isDrawingMode: true });
        const ctx = whiteboard.getContext();

        fabric.Object.prototype.transparentCorners = false;

        const drawingMode = document.getElementById('drawing-mode') as HTMLCanvasElement,
            lineColor = 'red', //document.getElementById('drawing-color') as HTMLCanvasElement,
            lineWidth = 5, //document.getElementById('drawing-line-width') as HTMLElement,
            clear = document.getElementById('clear-canvas') as HTMLCanvasElement;

        clear.onclick = function() { whiteboard.clear() };

        drawingMode.onclick = function() {
            whiteboard.isDrawingMode = !whiteboard.isDrawingMode;
            if (whiteboard.isDrawingMode) {
                drawingMode.innerHTML = 'Selector Mode';
            }
            else {
                drawingMode.innerHTML = 'Drawing Mode';
            }
        };

        if (whiteboard.freeDrawingBrush) {
            whiteboard.freeDrawingBrush.color = lineColor;
            whiteboard.freeDrawingBrush.width = lineWidth;
        }

        /*
        lineColor.onchange = function() {
            let brush = whiteboard.freeDrawingBrush;
            brush.color = lineColor;
        };
        */

        /*
        document.getElementById('tool-selector').onchange = function() {

        }
        */
    });

    return (
        <div className='canvas-style' id='canvas-style'>
                <canvas className={className} id={className}></canvas>
        </div>
    );
}

export default Whiteboard;