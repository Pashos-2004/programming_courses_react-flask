import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField, Button} from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'
import BackToMenuBtn from './backTomenuBtn.js';
import "./pageWithText.css"

export default function PageWithText(props){


    const [PageTitle,SetPageTitle] = useState("C++ это круто");
    const [Text,SetText] = useState(props.text )

    function SplitIntoParagraphs(str,divider){
        let res = str.split(divider).map(item => <p className='Text'>{item}</p>)
        return res
    }

    function SaveBtnOnClick(){

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
                    id="mainText"
                    label="Текст страницы"
                    defaultValue={Text}
                    multiline
                    fullWidth
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                
                <br/>
                <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
                <br/>
                
                
                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber}/>
                <BackToMenuBtn />
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

    
                <PrevAndNextBnt courseID={props.courseID} number={props.number} maxNumber={props.maxNumber}/>
                <BackToMenuBtn/>
                </Box>
            </div>
            );
    }

}

       