import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,Button,colors,TextField } from '@mui/material';

export default function BackToMenuBtn(props){
    
    function BackToMenuBtnOnClick(){

    }

    return(
        <Button  variant="contained" onClick={BackToMenuBtnOnClick} >Вернуться на главную</Button>
    );

}