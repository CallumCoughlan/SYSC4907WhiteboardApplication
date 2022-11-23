import { fabric } from "fabric";

export type State = {
  canvas: fabric.Canvas | null;
  isDrawingMode: boolean,
  width: number;
  color: string;
  tool: string;
};

export type Action =
  | {
      type: "init";
      canvas: fabric.Canvas;
    }
  | {
      type: "update";
      color?: string;
      width?: number;
      isDrawingMode?: boolean;
      tool?: string;
    }
  | {
      type: "clear";
    }
  | {
      type: "dispose";
    };