import { FC } from 'react';

import Box from '@mui/material/Box';
import { FabricCanvasContainer } from '../../../containers';
import { Whiteboard, Toolbar, MessageWindow } from '../../Whiteboard';

const WhiteboardLayout: FC = () => (
  <FabricCanvasContainer.Provider>
    <Toolbar />
    <Box display="flex">
      <Whiteboard />
      <MessageWindow />
    </Box>
  </FabricCanvasContainer.Provider>
);

export default WhiteboardLayout;