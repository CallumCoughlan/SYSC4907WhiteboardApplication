import { FC } from 'react';

import { FabricCanvasContainer } from '../../../containers';
import { Whiteboard, Toolbar } from '../../Whiteboard';

const WhiteboardLayout: FC = () => (
  <FabricCanvasContainer.Provider>
    <Toolbar />
    <Whiteboard />
  </FabricCanvasContainer.Provider>
);

export default WhiteboardLayout;