import {Dispatch, FC, memo, useState, useCallback} from 'react';
import './style.css';
import { Action } from '../../types/whiteboard';
import { ToggleButtonGroup } from '@mui/material';
import { ToggleButton } from '@mui/material';
import * as React from 'react';
import { FabricCanvasContainer } from '../../containers';

type WhiteboardProps = {
    className?: string;
    dispatch: Dispatch<Action>;
  };
  
  const ToolBar: FC<WhiteboardProps> = memo(({ className, dispatch }) => {
    const onClickCursor = () => dispatch({ type: "cursor", isDrawingMode: false });
    const onClickPencil = () => dispatch({ type: "pencil", isDrawingMode: true });
    const onClickCircle = () => dispatch({ type: "circle" });
    const onClickRectangle = () => dispatch({ type: "rectangle"});
    const onSetWidth = () => dispatch({ type: "setWidth", width: 5 });
    const onSetColor = () => dispatch({ type: "setColor", color: '#FF0000' });
    const onClickClear = () => dispatch({ type: "clear" });

    const [alignment, setAlignment] = React.useState('Pencil');
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };
  
    return (
      <div className="toolbar">

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Cursor" onClick={onClickCursor}>Cursor</ToggleButton>
          <ToggleButton value="Pencil" onClick={onClickPencil}>Pencil</ToggleButton>
          <ToggleButton value="Circle" onClick={onClickCircle}>Circle</ToggleButton>
          <ToggleButton value="Rectangle" onClick={onClickRectangle}>Rectangle</ToggleButton>
          <ToggleButton value="Width" onClick={onSetWidth}>TODO WIDTH</ToggleButton>
          <ToggleButton value="Color" onClick={onSetColor}>TODO COLOR</ToggleButton>
          <ToggleButton value="Clear" onClick={onClickClear}>clear</ToggleButton>
        </ToggleButtonGroup>

      </div>
    );
  });
  
  const Container: FC = () => {
    const { dispatch } = FabricCanvasContainer.useContainer();
  
    return <ToolBar dispatch={dispatch} />;
  };
  
  export default Container;