import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<Registration/>}/>
        </Routes>
    );
};

export default RouterPage;