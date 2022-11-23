import {Dispatch, FC, memo} from 'react';
import './style.css';
import { Action } from '../../types/whiteboard';
import { Button } from '@mui/material';
import { FabricCanvasContainer } from '../../containers';

type WhiteboardProps = {
    className?: string;
    dispatch: Dispatch<Action>;
  };
  
  const ToolBar: FC<WhiteboardProps> = memo(({ className, dispatch }) => {
    const onClickClear = () => dispatch({ type: "clear" });
    const onClickCursor = () => dispatch({ type: "update", isDrawingMode: false });
    const onClickPencil = () => dispatch({ type: "update", color: '#FFFFFF', width: 5, isDrawingMode: true });
    const onClickCircle = () => dispatch({ type: "update", color: '#FF0000', width: 5, isDrawingMode: true });
    const onClickRectangle = () => dispatch({ type: "update", color: '#0000FF', width: 5, isDrawingMode: true });
  
    return (
      <div className={className}>
        <Button variant="contained" color="primary" onClick={onClickCursor}>
          Cursor
        </Button>
        <Button variant="contained" color="primary" onClick={onClickPencil}>
          Pencil
        </Button>
        <Button variant="contained" color="primary" onClick={onClickCircle}>
          Circle
        </Button>
        <Button variant="contained" color="primary" onClick={onClickRectangle}>
          Square
        </Button>
        <Button variant="contained" color="primary" onClick={onClickClear}>
          Clear
        </Button>
      </div>
    );
  });
  
  const Container: FC = () => {
    const { dispatch } = FabricCanvasContainer.useContainer();
  
    return <ToolBar dispatch={dispatch} />;
  };
  
  export default Container;