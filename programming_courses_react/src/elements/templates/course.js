import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import Button from '@mui/material/Button';

export default  function Course(props){
    return (
        <div >
            <table border={0} align='center' bgcolor={colors.grey[100]}>

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
        <Box paddingLeft={"49.5%"} >
        < Button variant="contained" >Посмотреть</Button>
        </Box>
        <br></br>
        </div> 
    )
}