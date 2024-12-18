import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField, Button, unstable_composeClasses} from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'
import BackToMenuBtn from './backTomenuBtn.js';
import DeletePageBtn from './deletePageBtn.js';
import { proxy } from '../../consts/proxy.js';
import "./pageWithText.css"

export default function QuestionPageWithOneAnswer(props){


    const [PageTitle,SetPageTitle] = useState(props.title);
    const [Question,SetQuestion]= useState(props.question);
    const [Answer,SetAnswer]= useState(props.rightAnswer);
    const [Explanation,SetExplanation]=useState(props.explanation);
    
    const handleChangeTitle = (event) => {
        
        SetPageTitle(event.target.value);
    };
    const handleChangeQuestion = (event) => {
        
        SetQuestion(event.target.value);
    };
    const handleChangeAnswer = (event) => {
        
        SetAnswer(event.target.value);
    };
    const handleChangeExplanation = (event) => {
        
        SetExplanation(event.target.value);
    };

    function CheckBtnOnClick(){
        console.log(props.rightAnswer)
        if(Answer.toLowerCase()!=props.rightAnswer.toLowerCase()){
            alert("Неврено")
        }else{
            alert("Верно")
        }
    }


    async function SaveBtnOnClick(){

        if(PageTitle.split(" ").join("") =="" || Question.split(" ").join("")=="" || Answer.split(" ").join("") =="" || Explanation.split(" ").join("")=="" ){
            alert("Заполните все поля")
            return;
        }
         let response;
                                   
                                    let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"page_id":props.page_id,
                                        "device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id"),
                                        "page":{"title":PageTitle,"right_answer":Answer,"question":Question,"explanation":Explanation,"type":"question_page_with_one_answer"
                                            ,"pageNum":props.number,"page_id":props.page_id}}
                                    
                                    
                                    
                                    try
                                    {
                                        response = await proxy.post("/update_page", JSON.stringify(values, null));
                                        
                                        
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
                                        
                                        if(data["status"]===200){
                                            alert("Успешно изменено")
                                            window.location.href = window.location.href
                                        }
                                        
                                        
                                    }
                                    catch(e)
                                    {
                                        alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
                                        console.log(e);
                                        //window.location.href = "http://localhost:3000/MainPage"
                                    }

        console.log("Был клик на кнопку сохранения");

    }

    if(sessionStorage.getItem("isAdmin")=="true"){
        console.log(props.page_id )
        console.log(props.courseID)
        return (
            <div>
                <Logo/>
                <Box paddingLeft={"20%"} paddingRight={"20%"}>

                
                <TextField
                    id="Title"
                    label="Заголовок"
                    defaultValue={PageTitle}
                    multiline
                    fullWidth
                    onChange={handleChangeTitle}
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                <TextField
                    id="Question"
                    label="Вопрос"
                    defaultValue={Question}
                    multiline
                    fullWidth
                    onChange={handleChangeQuestion}
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                <TextField
                    id="Answer"
                    label="Ответ"
                    defaultValue={Answer}
                    multiline
                    fullWidth
                    onChange={handleChangeAnswer}
                    maxRows={20}
                    margin="dense"
                    
                />
                
                <br/>
                <TextField
                    id="explanation"
                    label="Объяснение"
                    defaultValue={Explanation}
                    multiline
                    fullWidth
                    onChange={handleChangeExplanation}
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                <br/>
                <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
                <br/>
                <br/>
                
                
                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber} prev_id={props.prev_id} next_id={props.next_id}/>
                <BackToMenuBtn />
                <br/>
                <br/>
                <br/>
                
                <DeletePageBtn page_id={props.page_id} course_id={props.courseID} />

                
                </Box>
            </div>
            );
    }else{
        return (
            <div>
                <Logo/>
                <Box paddingLeft={"20%"} paddingRight={"20%"}  >
                <h1>{PageTitle}</h1>
                <h3>{Question}</h3>
                <TextField
                    id="Answer"
                    label="Ответ"
                    onChange={handleChangeAnswer}
                    multiline
                    fullWidth
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                <Button  variant="contained" onClick={CheckBtnOnClick} >Проверить</Button>
                <br/>

                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber} prev_id={props.prev_id} next_id={props.next_id}/>
                <BackToMenuBtn/>
                </Box>
            </div>
            );
    }

}

       