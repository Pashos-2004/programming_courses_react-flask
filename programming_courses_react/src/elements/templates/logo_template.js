import React,{ useEffect, useState }  from 'react';
import Logo from "../../pictures/logo.png"
import styles from "./logo_template.model.css"
import Box from '@mui/material/Box';
import { colors } from '@mui/material';

export default  function  logo (){
    return(
<div>
        <Box 
        sx={{
            alignContent:'center'
        }}
        >
            <img className={styles.logo_img} src={Logo} alt='Здесь могло быть лого, но что-то пошло не так' width={200} height={'auto'}></img>
        </Box>
        </div>
        )
}


