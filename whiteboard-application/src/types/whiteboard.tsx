import { fabric } from "fabric";

export type State = {
  canvas: fabric.Canvas | null;
  isDrawingMode: boolean,
  width: number;
  color: string;
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
    }
  | {
      type: "clear";
    }
  | {
      type: "dispose";
    };