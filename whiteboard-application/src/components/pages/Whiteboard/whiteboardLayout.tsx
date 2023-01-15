import { FC } from 'react';

import { FabricCanvasContainer } from '../../../containers';
import { Whiteboard, Toolbar } from '../../Whiteboard';

import LoginForm from './loginForm';
import RegisterForm from './registrationForm';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";


const WhiteboardLayout: FC = () => (
  // <FabricCanvasContainer.Provider>
  //   <Toolbar />
  //   <Whiteboard />
  // </FabricCanvasContainer.Provider>
  <Router>
    <div className="App">
        <div className="container d-flex align-items-center flex-column">
          <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/whiteboard" element={
              <FabricCanvasContainer.Provider>
                <Toolbar />
                <Whiteboard />
              </FabricCanvasContainer.Provider>}/>
          </Routes>
        </div>
    </div>
    </Router>
);

export default WhiteboardLayout;