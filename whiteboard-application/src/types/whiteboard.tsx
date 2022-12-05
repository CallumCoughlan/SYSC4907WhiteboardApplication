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
      toolType?: string;
    }
  | {
      type: "pencil";
      isDrawingMode?: boolean;
      toolType?: string;
  }
  | {
      type: "circle";
      toolType?: string;
  }
  | {
      type: "rectangle";
      toolType?: string;
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