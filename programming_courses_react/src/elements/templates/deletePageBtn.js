import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,Button,colors,TextField } from '@mui/material';

export default function DeletePageBtn(props){
    
    

    return(<Box paddingLeft={"50%"}>
        <Button  variant="contained" color="error" onClick={()=>{document.location.href="http://localhost:3000/MainPage"}}>Удалить страницу</Button>
        </Box>
    );

}