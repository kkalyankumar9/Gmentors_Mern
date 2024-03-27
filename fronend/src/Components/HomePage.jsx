import React from 'react'
import Navbar from './Navbar'

import { useDispatch, useSelector } from 'react-redux';
import Signin from './Signin';
import TaskBar from './Task_Operations/Taskbar';
const HomePage = () => {
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  return (
    <>
    <Navbar/>
<div>
    {
        isAuth? <TaskBar/>:<Signin/>
    }
</div>
   
    </>
  )
}

export default HomePage