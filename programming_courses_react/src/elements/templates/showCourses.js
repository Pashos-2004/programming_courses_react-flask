import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import Course from "./course.js"
import cPlusPicrure from "../../pictures/c++.png"
import cSharpPicture from "../../pictures/cSh.png"

export default  function ShowCourses(props){
    const [Courses,SetCourses] = useState(<h1>Что-то пошло не так и курсы не загрузились</h1>);
    

    let arr = [];
    let first = new Map()
    first.set("id",26)
    first.set("courseText","sdhtrehf")
    first.set("courseTitle","dfrjtfg")
    first.set("picture",cSharpPicture)
    arr.push(first)
    

    let buff = arr.map((el)=>{return <Course  courseText={el.get("courseText")} courseTitle={el.get("courseTitle")} picture={el.get("picture")} id={el.get("id")}   />})
    

    return (
        <div>
            {buff}            
            <Course courseText="Здесь мог бы быть ваш курс" courseTitle="Ура пиво" picture={cPlusPicrure} id={1}/>
            <Course courseText="Здесь мог бы быть ваш курс" courseTitle="Ура пиво" picture={cSharpPicture} id={2}/>

            
        </div>
    )
}