import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import Logo from './logo_template.js';
import "./courseMenu.css"
 
export default  function CourseMenu (props){
    const [CourseTitle,SetCourses] = useState();
    

    return(
        <div>
            
            <Logo/>
            <Box paddingLeft={"10%"} paddingRight={"10%"}  >
                <h1>{props.CourseTitle}</h1>
            </Box>



        </div>
    );

}