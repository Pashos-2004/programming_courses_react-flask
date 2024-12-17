import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import './menuRowPage.css'

export default  function MenuRowPage(props){
    

    let bgcolor= props.pageNum%2==0 ? colors.blue[100] : ""
    function rowOnClick(){
        //console.log("Был клик на строку: "+props.pageNum+". "+props.title+" id курса"+props.courseID)
        document.location.href = "http://localhost:3000/course/"+props.courseID+"/page/"+props.pageNum
    }

    return(
        <tr className='menuRow' onClick={rowOnClick} bgcolor={bgcolor} >
            
            <td  width={"100%"} text-align={"right"}>{props.pageNum+". "+props.title}</td>
            
        </tr>
    );



}