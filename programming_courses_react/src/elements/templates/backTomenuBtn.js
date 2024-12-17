import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,Button,colors,TextField } from '@mui/material';

export default function BackToMenuBtn(props){
    
    

    return(
        <Button  variant="contained" onClick={()=>{document.location.href="http://localhost:3000/MainPage"}}>Вернуться на главную</Button>
    );

}