import { Dispatch, useEffect, FC, memo } from 'react';
import { fabric } from "fabric"
import "./style.css"
import { Action } from "../../types/whiteboard";
import { FabricCanvasContainer } from '../../containers';

interface WhiteboardProps {
    className?: string
    dispatch: Dispatch<Action>;
}

const whiteboard_id = "canvas";

const Whiteboard: FC<WhiteboardProps> = memo(({ className, dispatch }) => {
    useEffect(() => {
      const initCanvas = new fabric.Canvas(whiteboard_id, {
        isDrawingMode: true,
        width: 1500,
        height: 750,
        backgroundColor: "#FFFFFF"
      });
  
      dispatch({ type: "init", canvas: initCanvas });

      return () => { 
        initCanvas.dispose(); 
        dispatch({ type: "dispose" }); 
      }
    }, []);
  
    return (
      <div className={className}>
        <canvas id={whiteboard_id} />
      </div>
    );
  });

const Container: FC = () => {
  const { dispatch } = FabricCanvasContainer.useContainer();

  return <Whiteboard dispatch={dispatch}/>;
};

export default Container;
