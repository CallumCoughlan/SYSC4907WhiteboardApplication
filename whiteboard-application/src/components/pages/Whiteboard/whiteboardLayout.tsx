import { FC } from 'react';

import { FabricCanvasContainer } from '../../../containers';
import { Whiteboard, Toolbar, MessageWindow } from '../../Whiteboard';

const WhiteboardLayout: FC = () => (
  <FabricCanvasContainer.Provider>
    <Toolbar />
    <Whiteboard />
    <MessageWindow />
  </FabricCanvasContainer.Provider>
);

export default WhiteboardLayout;