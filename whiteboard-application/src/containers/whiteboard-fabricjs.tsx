import { createContainer } from "unstated-next";
import { Reducer, useReducer } from "react";
import { fabric } from "fabric"
import { State, Action } from "../types/whiteboard";
import { blue } from "@mui/material/colors";




var firstIter = true;
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
      return { ...state };
    }

    //======================================
    //            Case 4 circle
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
    //            Case 5 rectangle
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
    //           Case 6 set width
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
      if (state.toolType == "circle") {
        addCircleMouseListeners(state)
      } else if (state.toolType == "rectangle") {
        addRectangleMouseListeners(state)
      }

      return { ...state };
    }

    //======================================
    //          Case 7 set color
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
    //           Case 8 clear
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
      state.canvas.backgroundColor = "#FFFFFF";

      return state;
    }

    //======================================
    //           Case 9 dispose
    //======================================
    case "dispose": {
      state.canvas = null;
      return state;
    }
  }
};


// adds mouse listeners to canvas that add circles
// state contains width and color for circles
function addCircleMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  //get out of drawing mode
  state.canvas.isDrawingMode = false;

  var circ: fabric.Ellipse;
  var isDown = false;
  var origX = 0;
  var origY = 0;

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
    var pointer = state.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = state.canvas.getPointer(o.e);

    circ = new fabric.Ellipse({
      top: origY,
      left: origX,
      rx: 1,
      ry: 1,
      strokeWidth: state.width,
      stroke: 'blue',
      fill: 'green'
    });

    state.canvas.add(circ);
  });

  state.canvas.on('mouse:move', function (o) {
    if (!state.canvas) {
      return state;
    }
    if (!isDown) return;
    var pointer = state.canvas.getPointer(o.e);

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
    state.canvas.discardActiveObject();

    //todo, send the new circle to the server???
  });
}


// adds mouse listeners to canvas that add rectangles
// state contains width and color for rectangles
function addRectangleMouseListeners(state: State) {
  if (!state.canvas) {
    return state;
  }

  var rect: fabric.Rect;
  var isDown = false;
  var origX = 0;
  var origY = 0;

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
    var pointer = state.canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = state.canvas.getPointer(o.e);
    rect = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      fill: 'rgba(0,0,0,0)',
      stroke: 'cyan',
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
    var pointer = state.canvas.getPointer(o.e);

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

    //todo, send the new recangle to the server???
  });
}

//Initial State
const Hooks = () => {
  const [{ canvas, color, width, toolType, isDrawingMode }, dispatch] = useReducer(reducer, {
    canvas: null,
    width: 8,
    color: "#000000",
    toolType: "pencil",
    isDrawingMode: true,
  });

  return { canvas, color, width, toolType, isDrawingMode, dispatch };
};

export default createContainer(Hooks);