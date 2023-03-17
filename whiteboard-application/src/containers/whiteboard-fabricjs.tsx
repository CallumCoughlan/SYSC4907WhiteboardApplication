import { createContainer } from "unstated-next";
import { Reducer, useReducer } from "react";
import { fabric } from "fabric"
import { State, Action } from "../types/whiteboard";
const io = require('socket.io-client');

const socket = io.connect("http://localhost:5001");
const reducer: Reducer<State, Action> = (state, action) => {
  console.log("current tool:" + state.toolType)

  //todo, figure out why the reducer is being called twice

  switch (action.type) {  

    //======================================
    //        Case 1 initialization
    //======================================
    case "init": {
      console.log("---------------------------------");
      console.log("init");
      action.canvas.freeDrawingBrush.width = state.width;
      action.canvas.freeDrawingBrush.color = state.color;
      action.canvas.isDrawingMode = true;
      socket.on("whiteboard-data", function(data: any) {
        // parse the data into the canvas
        if (action.canvas !== null && data !== null) {
          console.log('State is working')
          console.log(data);
          for (const object of data.objects) {
            action.canvas.add(object);
          }
          action.canvas.renderAll();
        }
      });

      return { ...state, canvas: action.canvas };
    }

    //======================================
    //            Case 2 cursor
    //======================================
    case "cursor": {
      console.log("---------------------------------");
      console.log("cursor");

      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      // //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //add object selection listeners
      addSelectionListeners(state);

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      const { isDrawingMode } = action;
      if (isDrawingMode !== undefined) {
        state.isDrawingMode = isDrawingMode;
        state.canvas.isDrawingMode = isDrawingMode;
      }
      return { ...state };
    }

    //todo, merge with cursor since its basically the same code where we set the isDrawingMode ?????
    //======================================
    //            Case 3 pencil
    //======================================
    case "pencil": {
      console.log("---------------------------------");
      console.log("pencil");

      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      const { isDrawingMode } = action;
      if (isDrawingMode !== undefined) {
        state.isDrawingMode = isDrawingMode;
        state.canvas.isDrawingMode = isDrawingMode;
      }

      const json = state.canvas.toJSON();
      socket.emit("whiteboard-data", json);
      return { ...state };
    }

    //======================================
    //            Case 4 line
    //======================================
    case "line": {
      console.log("---------------------------------");
      console.log("line");

      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      state.canvas.isDrawingMode = false;

      //add line mouse listeners
      addLineMouseListeners(state)

      return { ...state };
    }

    //======================================
    //            Case 5 arrow
    //======================================
    case "arrow": {
      console.log("---------------------------------");
      console.log("arrow");

      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      state.canvas.isDrawingMode = false;

      //add arrow mouse listeners
      addArrowMouseListeners(state)

      return { ...state };
    }

    //======================================
    //            Case 6 circle
    //======================================
    case "circle": {
      console.log("---------------------------------");
      console.log("circle");
      console.log(state.width)
      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      state.canvas.isDrawingMode = false;

      //add circle mouse listeners
      addCircleMouseListeners(state)

      return { ...state };
    }

    //======================================
    //            Case 7 rectangle
    //======================================
    case "rectangle": {
      console.log("---------------------------------");
      console.log("rectangle");
      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      state.canvas.isDrawingMode = false;

      //add rectangle mouse listeners
      addRectangleMouseListeners(state)

      return { ...state };
    }

    //======================================
    //            Case 8 textbox
    //======================================
    case "textbox": {
      console.log("---------------------------------");
      console.log("textbox");
      if (!state.canvas) {
        return state;
      }

      //update state toolType
      const { toolType } = action;
      if (toolType !== undefined) {
        state.toolType = toolType;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //get out of drawing mode
      state.canvas.isDrawingMode = false;

      //add rectangle mouse listeners
      addTextBoxMouseListeners(state)

      return { ...state };
    }

    //======================================
    //           Case 9 set width
    //======================================
    case "setWidth": {
      console.log("---------------------------------");
      console.log("set width");

      if (!state.canvas) {
        return state;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');

      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      //update state width
      state.canvas.freeDrawingBrush.width = state.width;
      const { width } = action;
      if (width !== undefined) {
        state.width = width;
      }

      //add new mouse listeners for circle and rectangle with new width
      if (state.toolType === "circle") {
        addCircleMouseListeners(state)
      } else if (state.toolType === "rectangle") {
        addRectangleMouseListeners(state)
      } else if (state.toolType === "line"){
        addLineMouseListeners(state)
      } else if (state.toolType === "arrow"){
        addArrowMouseListeners(state)
      }

      return { ...state };
    }

    //======================================
    //          Case 10 set color
    //======================================
    case "setColor": {
      console.log("---------------------------------");
      console.log("set color");

      if (!state.canvas) {
        return state;
      }

      const { color } = action;
      if (color !== undefined) {
        state.color = color;
      }
      return { ...state };
    }

    //======================================
    //           Case 11 clear
    //======================================
    case "clear": {
      console.log("---------------------------------");
      console.log("clear");

      if (!state.canvas) {
        return state;
      }

      //remove any previous listeners
      state.canvas.off('mouse:down').off('mouse:move').off('mouse:up');
      //re-enable object selection
      const allObjects = state.canvas.getObjects();
      allObjects.forEach((object) => {
        object.selectable = true
      });

      state.canvas.clear();

      const json = state.canvas.toJSON();
      socket.emit("whiteboard-data", json);
      return state;
    }

    //======================================
    //           Case 11 delete
    //======================================
    case "delete": {
      console.log("---------------------------------");
      console.log("delete");

      if (!state.canvas) {
        return state;
      }

      //get all selected objects and remove them from the canvas
      const allActiveObjects = state.canvas.getActiveObjects();
      allActiveObjects.forEach((object) => {
        state.canvas?.remove(object);
      });
      state.canvas.discardActiveObject().renderAll();

      const json = state.canvas.toJSON();
      socket.emit("whiteboard-data", json);

      return state;
    }

    //======================================
    //           Case 12 dispose
    //======================================
    case "dispose": {
      state.canvas = null;
      return state;
    }
  }
};

// adds object selection listeners to canvas that control display of delete button
function addSelectionListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  //when an object on the canvas is selected, display the delete button
  state.canvas.on("selection:created", function() {
    const deleteButton = document.getElementById("delete-button");
    if (deleteButton) { deleteButton.style.display = "inline"};
  });

  //when the selection of an object ends, hide the delete button
  state.canvas.on("selection:cleared", function() {
    const deleteButton = document.getElementById("delete-button");
    if (deleteButton) { deleteButton.style.display = "none"};
  });
}

// adds mouse listeners to canvas that add lines
// state contains width for lines
function addLineMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  let line: fabric.Line;
  let isDown = false;
  let origX = 0;
  let origY = 0;

  state.canvas.on('mouse:down', function (o) {
    if (!state.canvas) {
      return state;
    }

    //temporarily disable object selection
    const allObjects = state.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false
    });
    state.canvas.selection = false;

    isDown = true;
    const pointer = state.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    line = new fabric.Line([origX,origY,origX,origY],{
      stroke: "#000000",
      strokeWidth: state.width,
    });

    state.canvas.add(line);
  });

  state.canvas.on('mouse:move', function (o) {
    if (!state.canvas) {
      return state;
    }

    if (!isDown) return;
    const pointer = state.canvas.getPointer(o.e);

    line.set({
      x2: pointer.x,
      y2: pointer.y
    })
    state.canvas.renderAll();
  });

  state.canvas.on('mouse:up', function (o) {
    if (!state.canvas) {
      return state;
    }
    isDown = false;
    //state.canvas.discardActiveObject();
    state.canvas.selection = true;

    const json = state.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  });
}


// adds mouse listeners to canvas that add arrows
// state contains width for arrows
function addArrowMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }
  let objs: fabric.Line[] = []
  let arrowBody: fabric.Line;
  let arrowLeft: fabric.Line;
  let arrowRight: fabric.Line;
  let isDown = false;
  let origX = 0;
  let origY = 0;

  state.canvas.on('mouse:down', function (o) {
    if (!state.canvas) {
      return state;
    }

    //temporarily disable object selection
    const allObjects = state.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false
    });
    state.canvas.selection = false;

    isDown = true;
    const pointer = state.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    arrowBody = new fabric.Line([origX,origY,origX,origY],{
      stroke: "#000000",
      strokeWidth: state.width,
    });

    arrowLeft = new fabric.Line([origX,origY,origX,origY],{
      stroke: "#000000",
      strokeWidth: state.width,
    });

    arrowRight = new fabric.Line([origX,origY,origX,origY],{
      stroke: "#000000",
      strokeWidth: state.width,
    });

    objs.push(arrowBody)
    objs.push(arrowLeft)
    objs.push(arrowRight)

    state.canvas.add(arrowBody);
    state.canvas.add(arrowLeft);
    state.canvas.add(arrowRight);
  });

  state.canvas.on('mouse:move', function (o) {
    if (!state.canvas) {
      return state;
    }

    if (!isDown) return;
    const pointer = state.canvas.getPointer(o.e);

    arrowBody.set({
      x2: pointer.x,
      y2: pointer.y
    })

    const dx=pointer.x-origX;
    const dy=pointer.y-origY;
    const angle=Math.atan2(dy,dx);

    arrowLeft.set({
      x1: pointer.x,
      y1: pointer.y,
      x2: pointer.x+(state.width*3)*Math.cos(angle+225*Math.PI/180),
      y2: pointer.y+(state.width*3)*Math.sin(angle+225*Math.PI/180)
    })

    arrowRight.set({
      x1: pointer.x,
      y1: pointer.y,
      x2: pointer.x+(state.width*3)*Math.cos(angle+135*Math.PI/180),
      y2: pointer.y+(state.width*3)*Math.sin(angle+135*Math.PI/180)
    })

    state.canvas.renderAll();
  });

  state.canvas.on('mouse:up', function (o) {
    if (!state.canvas) {
      return state;
    }
    isDown = false;

    //group all the objects 
    const pointer = state.canvas.getPointer(o.e);
    const alltogetherObj = new fabric.Group(objs,{
      top:pointer.y - (pointer.y - origY)/2,
      left:pointer.x - (pointer.x - origX)/2,
      originX:'center',
      originY:'center'});
    state.canvas.add(alltogetherObj);
    state.canvas.renderAll();
    
    //remove singular arrow parts
    state.canvas.remove(arrowBody);
    state.canvas.remove(arrowLeft);
    state.canvas.remove(arrowRight);
    objs.pop()
    objs.pop()
    objs.pop()

    state.canvas.discardActiveObject();
    state.canvas.selection = true;

    const json = state.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  });
}


// adds mouse listeners to canvas that add circles
// state contains width and color for circles
function addCircleMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  let circ: fabric.Ellipse;
  let isDown = false;
  let origX = 0;
  let origY = 0;

  state.canvas.on('mouse:down', function (o) {
    if (!state.canvas) {
      return state;
    }

    //temporarily disable object selection
    const allObjects = state.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false
    });

    isDown = true;
    const pointer = state.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

    circ = new fabric.Ellipse({
      top: origY,
      left: origX,
      rx: 1,
      ry: 1,
      strokeWidth: state.width,
      stroke: 'blue',
      fill: 'white'
    });

    state.canvas.add(circ);
  });

  state.canvas.on('mouse:move', function (o) {
    if (!state.canvas) {
      return state;
    }
    if (!isDown) return;
    const pointer = state.canvas.getPointer(o.e);

    if (origX > pointer.x) {
      circ.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      circ.set({ top: Math.abs(pointer.y) });
    }

    circ.set({ rx: Math.abs(origX - pointer.x) / 2 });
    circ.set({ ry: Math.abs(origY - pointer.y) / 2 });

    state.canvas.renderAll();
  });

  state.canvas.on('mouse:up', function (o) {
    if (!state.canvas) {
      return state;
    }
    isDown = false;
    // state.canvas.discardActiveObject();

    state.canvas.discardActiveObject();
    //state.canvas.selection = true;

    const json = state.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  });
}


// adds mouse listeners to canvas that add rectangles
// state contains width and color for rectangles
function addRectangleMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  let rect: fabric.Rect;
  let isDown = false;
  let origX = 0;
  let origY = 0;

  state.canvas.on('mouse:down', function (o) {
    if (!state.canvas) {
      return state;
    }

    //temporarily disable object selection
    const allObjects = state.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false
    });

    isDown = true;
    const pointer = state.canvas.getPointer(o.e);
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
      stroke: 'red',
      strokeWidth: state.width,
      transparentCorners: false,
    });

    state.canvas.add(rect);
  });

  state.canvas.on('mouse:move', function (o) {
    if (!state.canvas) {
      return state;
    }

    if (!isDown) return;
    const pointer = state.canvas.getPointer(o.e);

    if (origX > pointer.x) {
      rect.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      rect.set({ top: Math.abs(pointer.y) });
    }

    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });

    state.canvas.renderAll();
  });

  state.canvas.on('mouse:up', function (o) {
    if (!state.canvas) {
      return state;
    }
    isDown = false;
    state.canvas.discardActiveObject();
    const json = state.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  });
}

// adds mouse listeners to canvas that add rectangles
// state contains width and color for rectangles
function addTextBoxMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  let textbox: fabric.Textbox;
  let isDown = false;
  let origX = 0;
  let origY = 0;

  state.canvas.on('mouse:down', function (o) {
    if (!state.canvas) {
      return state;
    }

    //temporarily disable object selection
    const allObjects = state.canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false
    });

    isDown = true;
    const pointer = state.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

    textbox = new fabric.Textbox(
      "", {
        selectable: true,
        evented: true,
        editable: true,
        width: 450,
        height: 400
      }
    );

    state.canvas.add(textbox);
  });

  state.canvas.on('mouse:move', function (o) {
    if (!state.canvas) {
      return state;
    }

    if (!isDown) return;
    const pointer = state.canvas.getPointer(o.e);

      textbox.set({ left: pointer.x });
    
      textbox.set({ top: pointer.y });
    

    // textbox.set({ width: Math.abs(origX - pointer.x) });
    // textbox.set({ height: Math.abs(origY - pointer.y) });

    state.canvas.renderAll();
  });

  state.canvas.on('mouse:up', function (o) {
    if (!state.canvas) {
      return state;
    }
    isDown = false;
    state.canvas.discardActiveObject();
    const json = state.canvas.toJSON();
    socket.emit("whiteboard-data", json);
  });
}

//Initial State
const Hooks = () => {
  const [{ canvas, color, width, toolType, isDrawingMode }, dispatch] = useReducer(reducer, {
    canvas: null,
    width: 6,
    color: "#000000",
    toolType: "pencil",
    isDrawingMode: true,
  });

  return { canvas, color, width, toolType, isDrawingMode, dispatch };
};

export default createContainer(Hooks);