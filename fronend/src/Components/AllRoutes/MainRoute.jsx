import React from 'react'
import {Routes,Route} from "react-router-dom"

import Signup from '../Signup'
import Signin from '../Signin'
import PrivateRoute from './PrivateRoute'
import TaskBar from '../Task_Operations/Taskbar'
import EditTask from '../Task_Operations/EditTask'
import Addtask from '../Task_Operations/AddTask'
import HomePage from '../HomePage'


const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/taskbar" element={<TaskBar/>}/>
        <Route path="/addpatient" element={<PrivateRoute><Addtask/></PrivateRoute>}/>
        <Route path="/taskedit/:taskId" element={<PrivateRoute><EditTask/></PrivateRoute>}/>
       
    </Routes>
  )
}

export default MainRoute