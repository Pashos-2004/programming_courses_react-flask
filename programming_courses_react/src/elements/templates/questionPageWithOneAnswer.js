import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField, Button} from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'
import BackToMenuBtn from './backTomenuBtn.js';
import DeletePageBtn from './deletePageBtn.js';
import "./pageWithText.css"

export default function QuestionPageWithOneAnswer(props){


    const [PageTitle,SetPageTitle] = useState(props.title);
    const [Question,SetQuestion]= useState(props.question);
    const [Answer,SetAnswer]= useState();
    
    


    const handleChangeTitle = (event) => {
        
        SetPageTitle(event.target.value);
    };
    const handleChangeQuestion = (event) => {
        
        SetQuestion(event.target.value);
    };
    const handleChangeAnswer = (event) => {
        
        SetAnswer(event.target.value);
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

        

        console.log("Был клик на кнопку сохранения");

    }

    if(sessionStorage.getItem("isAdmin")=="true"){
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
                <br/>
                <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
                <br/>
                <br/>
                
                
                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber}/>
                <BackToMenuBtn />
                <br/>
                <br/>
                <br/>
                <br/>
                <DeletePageBtn/>

                
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

                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber}/>
                <BackToMenuBtn/>
                </Box>
            </div>
            );
    }

}

       