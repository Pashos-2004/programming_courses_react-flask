import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField, Button} from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'
import BackToMenuBtn from './backTomenuBtn.js';
import "./pageWithText.css"

export default function PageWithText(props){


    const [PageTitle,SetPageTitle] = useState("C++ это круто");
    const [Text,SetText] = useState(`По умолчанию язык C++ не содержит встроенных средств для ввода с консоли и вывода на консоль, эти средства предоставляются библиотекой iostream. В ней определены два типа: istream и ostream. istream представляет поток ввода, а ostream - поток вывода.

Вообще, сам термин "поток" в данном случае представляет последовательность символов, которая записывается на устройство ввода-вывода или считывается с него. И в данном случае под устройством ввода-вывода рассматривается консоль.

Для записи или вывода символов на консоль применяется объект cout, который представляет тип ostream. А для чтения с консоли используется объект cin

Для использования этих объектов в начало исходного файла необходимо подключить библиотеку iostream:`)

    function SplitIntoParagraphs(str,divider){
        let res = str.split(divider).map(item => <p className='Text'>{item}</p>)
        return res
    }

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
                {SplitIntoParagraphs(Text,'\n')}

    
                <PrevAndNextBnt number={props.number} maxNumber={props.maxNumber}/>
                <BackToMenuBtn/>
                </Box>
            </div>
            );
    }

}

       