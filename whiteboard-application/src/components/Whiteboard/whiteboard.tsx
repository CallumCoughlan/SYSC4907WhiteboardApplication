import React, { useEffect, useRef, useState } from 'react';
import { fabric } from "fabric"
import "./style.css"
import { Color } from 'fabric/fabric-impl';

interface WhiteboardProps {
    tool: string
}

// cursorSize?: string
// color?: string

var firstIter = true;
var whiteboardCanvas: fabric.Canvas;
var ctx;
const className = 'drawing-board';

//function Whiteboard(props: WhiteboardProps) {
function Whiteboard(props: WhiteboardProps) {

    console.log('-------------------------------------');
    console.log('GOT HERE 1 ' + props.tool);
    
    // const whiteboardRef = useRef(null);
    // whiteboardRef.current.focus()

    if(firstIter){
        console.log('GOT HERE 2 ' + props.tool);
        whiteboardCanvas = new fabric.Canvas('c', {isDrawingMode: true});

        whiteboardCanvas.add(
            new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' }),
            new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }),
            new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })
        );


        ctx = whiteboardCanvas.getContext();
        fabric.Object.prototype.transparentCorners = false;

        firstIter = false
    }

    //const whiteboardCanvas = new fabric.Canvas(className, { isDrawingMode: true });

    console.log(whiteboardCanvas)

    if(props.tool === 'pencil') {
        console.log('running pencil code...');
        whiteboardCanvas.isDrawingMode = true;
        whiteboardCanvas.freeDrawingBrush.color = 'red';
        whiteboardCanvas.freeDrawingBrush.width = 5;


    } else if(props.tool === 'rectangle') {
        console.log('running rectangle code...');
        whiteboardCanvas.isDrawingMode = false;

    } else if(props.tool === 'circle') {
        console.log('running circle code...');
        whiteboardCanvas.isDrawingMode = true;
        whiteboardCanvas.freeDrawingBrush.color = 'blue';
        whiteboardCanvas.freeDrawingBrush.width = 5;

    }


    whiteboardCanvas.renderAll();


    // const color = 'red', //document.getElementById('drawing-color') as HTMLCanvasElement,
    //     cursorSize = 5; //document.getElementById('drawing-line-width') as HTMLElement,
    //     const [tool, setTool] = useState("");

    // setTool(props.tool);

    // //when hook for tool triggers

    // if (tool === 'cursor') {
    //     whiteboard.isDrawingMode = true;
    //     whiteboard.freeDrawingBrush.color = color;
    //     whiteboard.freeDrawingBrush.width = cursorSize;
    // }

    // //end of hook


    //<canvas className={className} ref={whiteboardRef} id={className}></canvas>
    return (
        <div className='canvas-style' id='canvas-style'>
                <canvas id="c" width="800" height="400"></canvas>
        </div>
    );
}

export default Whiteboard;