import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
const io = require('socket.io-client');

const socket = io.connect("http://localhost:5001");

const WhiteboardRework = () => {
  const { editor, onReady } = useFabricJSEditor();

  const history = [];
  let chooseFile = document.getElementById("choose-file");
  if (chooseFile) { chooseFile.style.display = "none"};
  const [color, setColor] = useState("#35363a");
  const [width, setWidth] = useState("6");

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(1000);
    editor.canvas.setWidth(1500);
    editor.canvas.freeDrawingBrush.width = 6;
    editor.canvas.renderAll();
    socket.on("whiteboard-data", function(data) {
      if (editor !== null && data !== null) {
        editor.canvas.loadFromJSON(data);
        editor.canvas.renderAll();
      }
    });
  }, [editor?.canvas.backgroundImage]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const toggleCursor = () => {
    editor.canvas.off('mouse:down').off('mouse:move').off('mouse:up');
    editor.canvas.isDrawingMode = false;
    
    const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

    addCursorListeners()
  };

  function addCursorListeners() {
      editor.canvas.on("mouse:up", function (opt) {
        editor.canvas.renderAll();
        const json = editor.canvas.toJSON();
        socket.emit("whiteboard-data", json);
        this.selection = true;
      });
  }

  const onKeyDown = (event) => {
    if (event.key === "Delete") {
      deleteObject();
    }
  }

  document.addEventListener("keydown", onKeyDown, false);

  const toggleDraw = () => {
    editor.canvas.off('mouse:down').off('mouse:move').off('mouse:up');
    editor.canvas.isDrawingMode = true;

    const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

    addCursorListeners()
  };

  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  const deleteObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  const onAddLine = () => {
    //remove any previous listeners
    editor.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

    //re-enable object selection
    const allObjects = editor.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = true
    });

    //get out of drawing mode
    editor.canvas.isDrawingMode = false;

    //add line mouse listeners
    addLineMouseListeners()
  }

  function addLineMouseListeners() {
    let line;
    let isDown = false;
    let origX = 0;
    let origY = 0;
  
    editor.canvas.on('mouse:down', function (o) {
      //temporarily disable object selection
      const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = false
      });
      editor.canvas.selection = false;
  
      isDown = true;
      const pointer = editor.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      line = new fabric.Line([origX,origY,origX,origY],{
        stroke: editor.canvas.freeDrawingBrush.color,
        strokeWidth: editor.canvas.freeDrawingBrush.width,
      });
  
      editor.canvas.add(line);
    });
  
    editor.canvas.on('mouse:move', function (o) { 
      if (!isDown) return;
      const pointer = editor.canvas.getPointer(o.e);
  
      line.set({
        x2: pointer.x,
        y2: pointer.y
      })
      editor.canvas.renderAll();
    });
  
    editor.canvas.on('mouse:up', function (o) {
      isDown = false;
      //state.canvas.discardActiveObject();
      editor.canvas.selection = true;
  
      const json = editor.canvas.toJSON();
      socket.emit("whiteboard-data", json);
    });
  }

  const onAddCircle = () => {
      //remove any previous listeners
      editor.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      editor.canvas.isDrawingMode = false;

      //add circle mouse listeners
      addCircleMouseListeners()
  };

  // adds mouse listeners to canvas that add circles
// state contains width and color for circles
function addCircleMouseListeners() {
  let circ;
  let isDown = false;
  let origX = 0;
  let origY = 0;

  editor.canvas.on('mouse:down', function (o) {
    //temporarily disable object selection
    const allObjects = editor.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false
    });

    isDown = true;
    const pointer = editor.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

    circ = new fabric.Ellipse({
      top: origY,
      left: origX,
      rx: 1,
      ry: 1,
      strokeWidth: editor.canvas.freeDrawingBrush.width,
      stroke: editor.canvas.freeDrawingBrush.color,
      fill: 'white'
    });

    editor.canvas.add(circ);
  });

  editor.canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    const pointer = editor.canvas.getPointer(o.e);

    if (origX > pointer.x) {
      circ.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      circ.set({ top: Math.abs(pointer.y) });
    }

    circ.set({ rx: Math.abs(origX - pointer.x) / 2 });
    circ.set({ ry: Math.abs(origY - pointer.y) / 2 });

    editor.canvas.renderAll();
  });

  editor.canvas.on('mouse:up', function (o) {
    isDown = false;
    // state.canvas.discardActiveObject();

    editor.canvas.discardActiveObject();
    //state.canvas.selection = true;

    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  });
}

  const onAddArrow = () => {
    let triangle = new fabric.Triangle({
      width: 10, 
      height: 15, 
      fill: editor.canvas.freeDrawingBrush.color, 
      left: 235, 
      top: 65,
      angle: 90
    });

    let line = new fabric.Line([50, 100, 200, 100], {
        left: 75,
        top: 70,
        stroke: editor.canvas.freeDrawingBrush.color
    });

    let objs = [line, triangle];

    let alltogetherObj = new fabric.Group(objs);
    editor.canvas.add(alltogetherObj);
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  const onAddRectangle = () => {

    editor.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      editor.canvas.isDrawingMode = false;

      //add rectangle mouse listeners
      addRectangleMouseListeners()
  };

  function addRectangleMouseListeners() {
    let rect;
    let isDown = false;
    let origX = 0;
    let origY = 0;
  
    editor.canvas.on('mouse:down', function (o) {
      //temporarily disable object selection
      const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = false
      });
  
      isDown = true;
      const pointer = editor.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
  
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - origX,
        height: pointer.y - origY,
        angle: 0,
        fill: 'rgba(0,0,0,0)',
        stroke: editor.canvas.freeDrawingBrush.color,
        strokeWidth: editor.canvas.freeDrawingBrush.width,
        transparentCorners: false,
        selectable: true
      });
  
      editor.canvas.add(rect);
    });
  
    editor.canvas.on('mouse:move', function (o) {  
      if (!isDown) return;
      const pointer = editor.canvas.getPointer(o.e);
  
      if (origX > pointer.x) {
        rect.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        rect.set({ top: Math.abs(pointer.y) });
      }
  
      rect.set({ width: Math.abs(origX - pointer.x) });
      rect.set({ height: Math.abs(origY - pointer.y) });
  
      editor.canvas.renderAll();
    });
  
    editor.canvas.on('mouse:up', function (o) {
      isDown = false;
      editor.canvas.discardActiveObject();
      const json = editor.canvas.toJSON();
      socket.emit("whiteboard-data", json);
    });
  }

  const addText = () => {
    const textbox = new fabric.Textbox(
      "Insert Text", {
        selectable: true,
        evented: true,
        editable: true,
        width: 200,
        height: 400
      }
    );
    editor.canvas.add(textbox);
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  const addImage = () => {
    //remove any previous listeners
    editor.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

    //re-enable object selection
    const allObjects = editor.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = true
    });

    //get out of drawing mode
    editor.canvas.isDrawingMode = false;
    
    //add image mouse listeners on imageElement load
    let imageElement = new Image()

    imageElement.onload = function() {
      console.log("image loaded")
      addImageMouseListeners(imageElement)
    }

    imageElement.onerror = function() {
      console.log("image failed to load")
    }

    if (chooseFile) { 
      chooseFile.style.display = "inline"
    
      chooseFile.onchange = function(e) {
        //@ts-ignore
        let file = e.currentTarget.files[0];
        let reader = new FileReader();

        reader.onload = function() {

          const url = reader.result;
          imageElement.src = url;
      }
      reader.readAsDataURL(file)
      }
    }
  }

  function addImageMouseListeners(imageElement) {  
    let image;
    let isDown = false;
    let origX = 0;
    let origY = 0;
  
    editor.canvas.on('mouse:down', function (o) {
      //temporarily disable object selection
      const allObjects = editor.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = false
      });
      editor.canvas.selection = false;
  
      isDown = true;
      let pointer = editor.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
  
      image = new fabric.Image(imageElement, {
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - origX,
        height: pointer.y - origY,
        angle: 0
      });
  
      editor.canvas.add(image)
    });
    
    editor.canvas.on('mouse:move', function (o) {
      if (!isDown) return;
      let pointer = editor.canvas.getPointer(o.e);
  
      if (origX > pointer.x) {
        image.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        image.set({ top: Math.abs(pointer.y) });
      }
  
      image.scaleToWidth(Math.abs(origX - pointer.x))
      image.scaleToHeight(Math.abs(origY - pointer.y));
  
      editor.canvas.renderAll();
    });
    
    editor.canvas.on('mouse:up', function (o) {
      isDown = false;
      const json = editor.canvas.toJSON();
      socket.emit("whiteboard-data", json);
    });
  }

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.width = width;
    if (editor.canvas.getActiveObjects() != null) {
      let objs = editor.canvas.getActiveObjects();

      objs.forEach((object) => {
        object.strokeWidth = width;
      });  

      editor.canvas.renderAll();
      const json = editor.canvas.toJSON();
      socket.emit("whiteboard-data", json);
    }
  }, [width]);

  return (
    <div className="WhiteBoard">
      <div style={{margin: "0 auto", height: '5%'}}>
        <ButtonGroup
            color="primary"
            aria-label="Platform"
        >
          <Button onClick={toggleCursor}>
            Cursor
          </Button>
          <Button onClick={toggleDraw}>
            Draw
          </Button>
          <Button onClick={onAddLine}>
            Line
          </Button>
          <Button onClick={onAddCircle}>
            Circle
          </Button>
          <Button onClick={onAddArrow}>
            Arrow
          </Button>
          <Button onClick={onAddRectangle}>
            Rectangle
          </Button>
          <Button onClick={addText}>
            Text
          </Button>
          <Button>
            <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            />
          </Button>
          <FormControl>
            <Select value={width} onChange={(e) => setWidth(e.target.value)}>
              <MenuItem value={2}>Width 1</MenuItem>
              <MenuItem value={4}>Width 2</MenuItem>
              <MenuItem value={6}>Width 3</MenuItem>
              <MenuItem value={8}>Width 4</MenuItem>
              <MenuItem value={10}>Width 5</MenuItem>
            </Select>
          </FormControl>
          <Button id="image-button" value="image" onClick={addImage}>Image</Button>
          <input id="choose-file" type="file" accept="image/*"/>
          <Button onClick={undo}>
            Undo
          </Button>
          <Button onClick={redo}>
            Foward
          </Button>
          <Button onClick={deleteObject}>
            Delete
          </Button>
          <Button onClick={clear}>
            Clear
          </Button>
        </ButtonGroup>
      </div>
      <div style={{border: "solid", paddingLeft: 5}}>
        <FabricJSCanvas className="canvas" onReady={onReady} />
      </div>
    </div>
  );
}

export default WhiteboardRework;