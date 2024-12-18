import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField, Button} from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'
import BackToMenuBtn from './backTomenuBtn.js';
import DeletePageBtn from './deletePageBtn.js';
import { proxy } from '../../consts/proxy.js';
import "./pageWithText.css"

export default function PageWithText(props){


    const [PageTitle,SetPageTitle] = useState(props.title);
    const [Text,SetText] = useState(props.text )

    function SplitIntoParagraphs(str,divider){
        let res = str.split(divider).map(item => <p className='Text'>{item}</p>)
        return res
    }
    function handleChangeTitle (event){
        SetPageTitle(event.target.value);
    }
    function handleChangeText (event){
        SetText(event.target.value);
    }

    async function SaveBtnOnClick(){
        
        if(PageTitle.split(" ").join("") =="" || Text.split(" ").join("")=="" ){
            alert("Заполните все поля")
            return;
        }
    
        //console.log(page);
         let response;
                       
                        let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"page_id":props.page_id,
                            "device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id"),
                            "page":{"title":PageTitle,"text":Text,"type":"text_page","pageNum":props.number,"page_id":props.page_id}}
                        
                        
                        
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
                    onChange={handleChangeTitle}
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                <TextField
                    id="mainText"
                    label="Текст страницы"
                    defaultValue={Text}
                    multiline
                    fullWidth
                    onChange={handleChangeText}
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                
                <br/>
                <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
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
                {SplitIntoParagraphs(Text,'\n')}

    
                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber} prev_id={props.prev_id} next_id={props.next_id} />
                <BackToMenuBtn/>
                </Box>
            </div>
            );
    }

}

       