import React from 'react'
import Navbar from './Navbar'

import { useDispatch, useSelector } from 'react-redux';
import Signin from './Signin';
import TaskBar from './Task_Operations/Taskbar';
import { useNavigate } from "react-router-dom";
import { AddIcon} from '@chakra-ui/icons'
import { Text}from '@chakra-ui/react';
const HomePage = () => {
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const taskData = useSelector((store) => store.TaskReducer.taskData);
    const navigate = useNavigate();
    const handleadd=()=>{
      navigate("/addtask")
    }
  return (
    <>
    <Navbar/>
<div>
<div>
    {
        isAuth? <TaskBar/>:<Signin/>
    }
    </div>
    {taskData.length===0 && <Text onClick={handleadd}  fontWeight="bold" fontSize={"md"}> Add Task     <AddIcon ml={"10px"}/></Text>}
    
</div>
   
    </>
  )
}

export default HomePage