import React,{ useEffect, useState }  from 'react';
import Logo from './templates/logo_template.js';
import Top_bar from './templates/top_bar.js';
import { Stack } from '@mui/material'
import ShowCourses from './templates/showCourses.js';
import MainText from './templates/mainText.js';
import AboutUsText from './templates/aboutUsText.js';

export default function MainPage(){
    const [IsAdmin, SetIsAdmin] = React.useState(true);
    
return (
    <div>
        
        
        <Stack direction={'row'} paddingLeft={"44%"}>
        <Logo/>
        </Stack>
        <br></br>
        <Top_bar MainPageText={<MainText/>}
         CoursesText={<ShowCourses />}
        AboutUsText={<AboutUsText/>} AdminText="YOU are admin" 
        IsAdmin={IsAdmin}
        ></Top_bar>
        
        
   </div>
)
}
