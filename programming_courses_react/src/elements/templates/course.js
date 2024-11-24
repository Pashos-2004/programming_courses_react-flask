import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import Button from '@mui/material/Button';
import "./courses.css"

export default  function Course(props){
    function corseOnClick (){
       
        console.log("Был клик по "+props.courseTitle+"\n C ид:" + props.id)
    }

    return (
        <div onClick={corseOnClick} >
            <table border={0} align='center' bgcolor={colors.grey[100]} className='CoursesDiv'>

                <tr  >
                    <td rowSpan={2}>
                        <img src={props.picture} width={128} height={128}></img> 
                    </td>
                    <th width={"800"}>
                    {props.courseTitle}
                    </th>
                </tr>
                <tr>
                   
                    <td>{props.courseText}</td>
                </tr>
                
            </table>
            <br></br>
        </div> 
    )
}