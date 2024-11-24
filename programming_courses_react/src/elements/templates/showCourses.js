import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import Course from "./course.js"
import cPlusPicrure from "../../pictures/c++.png"
import cSharpPicture from "../../pictures/cSh.png"

export default  function ShowCourses(props){
    const [Courses,SetCourses] = useState(<h1>Что-то пошло не так и курсы не загрузились</h1>);

    useEffect(() => {
        SetCourses(<h1>Ура загрузилось</h1>)
    })

    return (
        <div>

            
            <Course courseText="Здесь мог бы быть ваш курс" courseTitle="Ура пиво" picture={cPlusPicrure}/>
            <Course courseText="Здесь мог бы быть ваш курс" courseTitle="Ура пиво" picture={cSharpPicture}/>
        </div>
    )
}