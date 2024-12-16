import React,{ useEffect, useState }  from 'react';
import Logo from './templates/logo_template.js';
import Top_bar from './templates/top_bar.js';
import { Stack } from '@mui/material'
import ShowCourses from './templates/showCourses.js';
import MainText from './templates/mainText.js';
import AboutUsText from './templates/aboutUsText.js';
import PersonalAccount from './templates/PersonalAccount.js';


export default function MainPage(){
    const [IsAuth, SetIsAuth] = React.useState(true);
    
return (
    <div>
        
        
        <Stack direction={'row'} paddingLeft={"44%"}>
        <Logo/>
        </Stack>
        <br></br>
        <Top_bar MainPageText={<MainText/>}
         CoursesText={<ShowCourses />}
        AboutUsText={<AboutUsText/>} 
        PersonalAccountText={<PersonalAccount UserEMail={sessionStorage.getItem("email") ? sessionStorage.getItem("email"):"" } IsAuth={sessionStorage.getItem("isAuth")=="true"}/>} 
        IsAuth={IsAuth}
        ></Top_bar>
        
        
   </div>
)
}
