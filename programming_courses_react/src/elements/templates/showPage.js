import React,{ useEffect, useState }  from 'react';
import Logo from "../../pictures/logo.png"
import Box from '@mui/material/Box';
import { colors } from '@mui/material';
import PageWithText from './pageWithText.js';
import PageWithVideo from './pageWithVideo.js';
import QuestionPageWithOneAnswer from './questionPageWithOneAnswer.js';
import { proxy } from '../../consts/proxy.js';

export default  function  ShowPage (props){
    const [Page,SetPage] = useState() ;


    
    useEffect(()=>{async function fetch_pages()  {
                
            
                
                let response;
                
                let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id"),"num":props.num}
                
                try
                {
                    response = await proxy.post("/get_page", JSON.stringify(values, null));
                    
                    
                    let data = response?.data
                   
                    if(data["status"]===404){
                        alert(data["info"]);
                        document.location.href = "http://localhost:3000/MainPage"
                    }
                    if(data["status"]===403){
                        alert(data["info"]);
                        sessionStorage.clear()
                        document.location.href = "http://localhost:3000/MainPage"
                    }
                    console.log(data)
                    let page=data["page"];
                    if(page["type"]=="text_page"){
                        SetPage(<PageWithText IsAdmin={true} courseID={props.courseID} number={props.num} maxNumber={data["countOfPages"]} title ={page["title"]} text={page["text"]}/>)
                    }else if(page["type"]=="video_page"){
                        SetPage(<PageWithVideo IsAdmin={true} courseID={props.courseID} number={props.num} maxNumber={data["countOfPages"]} title ={page["title"]} url={page["_url"]}/>)
                    }else if(page["type"]=="question_page_with_one_answer"){
                        SetPage(<QuestionPageWithOneAnswer IsAdmin={true} courseID={props.courseID} number={props.num} maxNumber={data["countOfPages"]} title ={page["title"]} question={page["question"]  }  rightAnswer={page["right_answer"]}/>)
                    }
                    //SetPages(data["pages"])
                    //SetCourses(courses.map((el)=>{ return <Course  courseText={el.get("courseText")} courseTitle={el.get("courseTitle")} picture={pictures.get(el.get("picture"))} id={el.get("id")}/>}))
                    
                    
                }
                catch(e)
                {
                    alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
                    console.log(e);
                    //window.location.href = "http://localhost:3000/MainPage"
                }
        
                
              }fetch_pages();}, []);
    return(
    <div>
        {Page}
        
              
    </div>
        )
}


