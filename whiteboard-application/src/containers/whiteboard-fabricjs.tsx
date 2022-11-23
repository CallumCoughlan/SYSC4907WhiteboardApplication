import { createContainer } from "unstated-next";
import { Reducer, useReducer } from "react";

import { State, Action } from "../types/whiteboard";

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "init": {
      action.canvas.freeDrawingBrush.width = state.width;
      action.canvas.freeDrawingBrush.color = state.color;
      action.canvas.isDrawingMode = true;
      return { ...state, canvas: action.canvas };
    }
    case "update": {
      if (!state.canvas) {
        return state;
      }
      const { color, width, isDrawingMode } = action;
      if (color) {
        state.color = color;
        state.canvas.freeDrawingBrush.color = color;
      }
      if (width) {
        state.width = width;
        state.canvas.freeDrawingBrush.width = width;
      }
      if (isDrawingMode) {
        state.isDrawingMode = isDrawingMode;
        state.canvas.isDrawingMode = isDrawingMode;
      }
      return { ...state };
    }
    case "clear": {
      if (!state.canvas) {
        return state;
      }
      state.canvas.clear();
      state.canvas.backgroundColor = "#FFFFFF";
      return state;
    }
  }
};

const Hooks = () => {
  const [{ canvas, color, width, isDrawingMode }, dispatch] = useReducer(reducer, {
    canvas: null,
    width: 5,
    color: "#000000",
    isDrawingMode: true
  });

  return { canvas, color, width, isDrawingMode, dispatch };
};

export default createContainer(Hooks);