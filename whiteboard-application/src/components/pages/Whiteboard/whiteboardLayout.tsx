import { FC } from 'react';

import Box from '@mui/material/Box';
import { FabricCanvasContainer } from '../../../containers';
import { Whiteboard, Toolbar, MessageWindow } from '../../Whiteboard';

import LoginForm from './loginForm';
import RegisterForm from './registrationForm';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Calendar from '../../Calendar/calendar';
import RequestSession from '../Scheduler/requestSession';


const WhiteboardLayout: FC = () => (
  <Router>
    <div className="App">
        <div className="container d-flex align-items-center flex-column">
          <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path='/home' element={<Calendar role="scholar"/>}/>
            <Route path='/request-session' element={<RequestSession role="student"/>}/>
            <Route path='/create-session' element={<RequestSession role="scholar"/>}/>
            <Route path="/whiteboard" element={
              <FabricCanvasContainer.Provider>
                <Toolbar />
                <Box display="flex">
                  <Whiteboard />
                  <MessageWindow />
                </Box>
              </FabricCanvasContainer.Provider>}/>
          </Routes>
        </div>
    </div>
    </Router>
);

export default WhiteboardLayout;