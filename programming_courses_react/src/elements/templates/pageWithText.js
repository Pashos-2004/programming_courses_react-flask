import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,colors,TextField } from '@mui/material';
import PrevAndNextBnt from './PrevAndNextBnt.js'

export default function PageWithText(props){


    const [PageTitle,SetPageTitle] = useState("C++ это круто");
    const [Text,SetText] = useState(`jdfghbnjkdghkrdfg`)

    function SplitIntoParagraphs(str,divider){
        let res = str.split(divider).map(item => <p>{item}</p>)
        return res
    }

    if(props.IsAdmin){
        return (
            <div>
                <Logo/>
                <Box paddingLeft={"20%"} paddingRight={"20%"}>

                <h1>{PageTitle}</h1>
                {SplitIntoParagraphs(Text,'\n')}
                <PrevAndNextBnt/>

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
                <PrevAndNextBnt/>
                </Box>
            </div>
            );
    }

}

       