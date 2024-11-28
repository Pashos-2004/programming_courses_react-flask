import React,{useEffect,useState} from 'react';
import { Box,colors,TextField } from '@mui/material';
import Logo from './templates/logo_template.js';
import ShowPages from './templates/showPages.js';
import "./courseMenu.css"

export default  function CourseMenu (props){

    const [CourseTitle,SetCourseTitle] = useState("C++ это круто");
    const [CourseDescription,SetcourseDescription] = useState("")

    function SplitIntoParagraphs(str,divider){
        let res = str.split(divider).map(item => <p>{item}</p>)
        return res
    }

    useEffect(() => {
         
         let buff = "Курс «Основы С++» предназначен для начинающих программистов и охватывает основные концепции и возможности языка программирования С++. \n В процессе обучения вы познакомитесь с базовыми понятиями, такими как переменные, типы данных, операторы, управляющие структуры, функции и классы. Вы также изучите основы объектно-ориентированного программирования, стандартные контейнеры и алгоритмы STL, а также получите представление о многопоточности и шаблонах." 
         SetcourseDescription(SplitIntoParagraphs(buff,"\n"));

      }, []);

    return(
        <div>
            
            <Logo/>
            <Box paddingLeft={"20%"} paddingRight={"20%"}  >
                <h1>{CourseTitle}</h1>
                <p className='CourseDescription'>{CourseDescription}</p>
                <ShowPages />

            </Box>



        </div>
    );

}