import {Dispatch, FC, memo, useState, useCallback} from 'react';
import './style.css';
import { Action } from '../../types/whiteboard';
import { ToggleButtonGroup } from '@mui/material';
import { ToggleButton, Button } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormHelperText } from '@mui/material';
import * as React from 'react';
import { FabricCanvasContainer } from '../../containers';

type WhiteboardProps = {
    className?: string;
    dispatch: Dispatch<Action>;
  };
  
  const ToolBar: FC<WhiteboardProps> = memo(({ className, dispatch }) => {
    const onClickCursor = () => dispatch({ type: "cursor", isDrawingMode: false, toolType: "cursor" });
    const onClickPencil = () => dispatch({ type: "pencil", isDrawingMode: true, toolType: "pencil" });
    const onClickLine = () => dispatch({ type: "line", toolType: "line" });
    const onClickArrow = () => dispatch({ type: "arrow", toolType: "arrow" });
    const onClickCircle = () => dispatch({ type: "circle", toolType: "circle" });
    const onClickRectangle = () => dispatch({ type: "rectangle", toolType: "rectangle"});
    const onSetColor = () => dispatch({ type: "setColor", color: '#FF0000' });
    const onClickClear = () => dispatch({ type: "clear" });
    const onClickDelete = () => dispatch({ type: "delete" });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        dispatch({ type: "delete" });
      }
    }

    document.addEventListener("keydown", onKeyDown, false);

    //toggle button group
    const [alignment, setAlignment] = React.useState('Pencil');
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };

    // width
    const [selected, setSelected] = useState('6');
    const selectionChangeHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      console.log("setting width to " + event.target.value)
      dispatch({ type: "setWidth", width: Number(event.target.value) })
      setSelected(event.target.value);
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
          <ToggleButton value="Line" onClick={onClickLine}>Line</ToggleButton>
          <ToggleButton value="Arrow" onClick={onClickArrow}>Arrow</ToggleButton>
          <ToggleButton value="Circle" onClick={onClickCircle}>Circle</ToggleButton>
          <ToggleButton value="Rectangle" onClick={onClickRectangle}>Rectangle</ToggleButton>
          <ToggleButton value="Color" onClick={onSetColor}>TODO COLOR</ToggleButton>
          <ToggleButton value="Clear" onClick={onClickClear}>clear</ToggleButton>
        </ToggleButtonGroup>

        <Button id="delete-button" value="Delete" onClick={onClickDelete}>Delete</Button>

        <FormControl>
          <Select value={selected} onChange={selectionChangeHandler}>
            <MenuItem value={2}>Width 1</MenuItem>
            <MenuItem value={4}>Width 2</MenuItem>
            <MenuItem value={6}>Width 3</MenuItem>
            <MenuItem value={8}>Width 4</MenuItem>
            <MenuItem value={10}>Width 5</MenuItem>
          </Select>
          <FormHelperText>Width</FormHelperText>
        </FormControl>

      </div>
    );
  });
  
  const Container: FC = () => {
    const { dispatch } = FabricCanvasContainer.useContainer();
  
    return <ToolBar dispatch={dispatch} />;
  };
  
  export default Container;