import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField, Button} from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'
import BackToMenuBtn from './backTomenuBtn.js';
import "./pageWithText.css"

export default function PageWithVideo(props){


    const [PageTitle,SetPageTitle] = useState("C++ это круто");
    const [VideoLink,SetVideoLink] = useState('https://www.youtube.com/embed/H9-7ngqWZpk?si=BEx9epw-eYudECyw')

    function SaveBtnOnClick(){

        console.log("Был клик на кнопку сохранения");

    }

    if(props.IsAdmin){
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
                    id="VideoLink"
                    label="Ссылка на встраиваемое видео"
                    defaultValue={VideoLink}
                    multiline
                    fullWidth
                    maxRows={20}
                    margin="dense"
                    
                />
                <br/>
                <br/>
                <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
                <br/>
                
                
                
                <PrevAndNextBnt number={props.number} maxNumber={props.maxNumber}/>
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
                <iframe width="640" height="315" src={VideoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    
                <PrevAndNextBnt number={props.number} maxNumber={props.maxNumber}/>
                <BackToMenuBtn/>
                </Box>
            </div>
            );
    }

}

       