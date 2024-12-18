
import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,Button,Stack } from '@mui/material';
import './PrevAndNextBnt.css'


export default function PrevAndNextBnt(props){   
    function PrevBtnOnClick(){
        if(props.number>1){
            document.location.href = "http://localhost:3000/course/"+props.courseID+"/page/"+props.prev_id
        }
    }

    function NextBtnOnClick(){
  
        if(props.maxNumber>props.number){
            
            document.location.href = "http://localhost:3000/course/"+props.courseID+"/page/"+props.next_id
        }
    }

    let prevBTN = props.number > 1 ? <Button variant="contained" onClick={PrevBtnOnClick}>Назад</Button> : <div></div>
    let nextBTN = props.number < props.maxNumber ? <Button variant="contained" onClick={NextBtnOnClick}>Вперёд</Button> : <div></div>
return (
    <div className='prevAndNextBntDiv'>
        <Stack direction={'row'} spacing={"80%"}>      
            {prevBTN}
            {nextBTN}
        </Stack>

    </div>);
}

       

