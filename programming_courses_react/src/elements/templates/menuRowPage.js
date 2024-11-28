import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import galka from '../../pictures/galka.png'
import crest from '../../pictures/crest.png'
import './menuRowPage.css'

export default  function MenuRowPage(props){
    const [Pages,SetPages] = useState("Не удалось загрузить");
    const [IsViewedImg,SetIsViewedIng] = useState();
    useEffect(() => {
       SetIsViewedIng(<img src={props.isViewed ? galka:crest} width={19}></img>)
        
     }, []);
    let bgcolor= props.id%2==0 ? colors.blue[100] : ""
    function rowOnClick(){
        console.log("Был клик на строку: "+props.id+". "+props.title)
    }

    return(
        <tr className='menuRow' onClick={rowOnClick} bgcolor={bgcolor} >
            
            <td  width={"80%"} text-align={"right"}>{props.id+". "+props.title}</td>
            <td> {IsViewedImg}</td>
        </tr>
    );



}