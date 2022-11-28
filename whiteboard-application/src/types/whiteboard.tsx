import { fabric } from "fabric";

export type State = {
  canvas: fabric.Canvas | null;
  isDrawingMode: boolean,
  width: number;
  color: string;
  toolType: string;
};

export type Action =
  | {
      type: "init";
      canvas: fabric.Canvas;
    }
  | {
      type: "cursor";
      isDrawingMode?: boolean;
    }
  | {
      type: "pencil";
      isDrawingMode?: boolean;
  }
  | {
      type: "circle";
  }
  | {
      type: "rectangle";
  }
  | {
      type: "setWidth";
      width?: number;
  }
  | {
      type: "setColor";
      color?: string;
  }
  | {
        type: "clear";
    }
  | {
      type: "dispose";
    };