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
  const [color, setColor] = useState("#35363a");
  const [width, setWidth] = useState("6");

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        const json = editor.canvas.toJSON();
        socket.emit("whiteboard-data", json);
        this.selection = true;
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

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

  const toggleDraw = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
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

  const onAddCircle = () => {
    let circ = new fabric.Circle({radius: 50,
      fill: '',
      stroke: editor.canvas.freeDrawingBrush.color,
      strokeWidth: editor.canvas.freeDrawingBrush.width,
      top: 100, 
      left: 100 
    });
    editor.canvas.add(circ);
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };
  const onAddRectangle = () => {
    editor.addRectangle();
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };
  const addText = () => {
    const textbox = new fabric.Textbox(
      "Insert Text", {
        selectable: true,
        evented: true,
        editable: true,
        width: 100,
        height: 400
      }
    );
    editor.canvas.add(textbox);
    const json = editor.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.width = width;
  }, [width]);

  return (
    <div className="WhiteBoard">
      <div style={{margin: "0 auto"}}>
        <ButtonGroup
            color="primary"
            aria-label="Platform"
        >
          <Button onClick={toggleDraw}>
            Cursor/Draw
          </Button>
          <Button onClick={onAddCircle}>
            Circle
          </Button>
          <Button onClick={onAddRectangle}>
            Rectangle
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