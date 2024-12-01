import React,{useEffect,useState} from 'react';
import { Box,TextField,colors,Button } from '@mui/material';

import "./personalAccount.css"
import { common } from '@mui/material/colors';

 
export default  function PersonalAccount (props){

    const [EmailError,SetEmailError] = useState(false);
    const [OldPasswdError,SetOldPasswdError] = useState(false);
    const [NewPasswdError1,SetNewPasswdError1] = useState(false);
    const [NewPasswdError2,SetNewPasswdError2] = useState(false);

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const validateEmail = (email) => {
        return EMAIL_REGEXP.test(email)
      };

    function validateOldPasswd(){
        let oldPasswd = document.getElementById("old_passwd");
        let isPasswdRight=true;

        return true
    }

    function validateNewPasswd1(passwd){
        let newPasswd1 = document.getElementById("new_passwd_1");
        return newPasswd1.value.length>=8   
    }

    function isNewPasswordSame(){
        let newPasswd1 = document.getElementById("new_passwd_1");
        let newPasswd2 = document.getElementById("new_passwd_2")

        return(newPasswd1.value===newPasswd2.value)
    }

    function validateForm(){
        let isOk= true;
        let email = document.getElementById("Email_Field");
        
        let newPasswd2 = document.getElementById("new_passwd_2")

        SetEmailError(false);
        SetOldPasswdError(false);
        SetNewPasswdError1(false);
        SetNewPasswdError2(false);
        
        if(!validateEmail(email.value)) {
            SetEmailError(true);
            isOk=false;
            alert("Неверный формат почты")
        }

        if(!validateOldPasswd){
            SetOldPasswdError(true);
            isOk=false;
            alert("Неверный пароль")
        }
        if(!validateNewPasswd1()){
            SetNewPasswdError1(true);
            isOk=false;
            alert("Пароль слишком простой (введите хотя бы 8 символов)")
        }
        if(!isNewPasswordSame()){
            SetNewPasswdError2(true)
            isOk=false;
            alert("Пароли не одинаковые")
        }

        return isOk;
    }
    function saveBtnOnClick(){


        if(validateForm()){
            
        }
    }


    return(
        <Box className="PersonalAccount" alignContent={"left"}>
            <h1>Добро пожаловать, рады видеть вас снова!</h1>
            <TextField
                error={EmailError}
                id="Email_Field"
                label="Почта"
                defaultValue={props.UserEMail}
                helperText="Введите новую почту"
                margin="dense"
            />
            <br/>
            <TextField
                error={OldPasswdError}
                id="old_passwd"
                label="Старый пароль"
                type="password"
                helperText="Введите старый пароль"
                margin="dense"
               
            />
            <br/>
            <TextField
                error={NewPasswdError1}
                id="new_passwd_1"
                label="Новый пароль"
                type="password"
                helperText="Введите новый пароль"
                margin="dense"
            />
            <br/>
            <TextField
                error={NewPasswdError2}
                id="new_passwd_2"
                label="Ещё раз"
                type="password"
                helperText="Повторите новый пароль"
                margin="dense"
            />
            <br/>
            <Button variant="contained" onClick={saveBtnOnClick}>Сохранить изменения</Button>
            
        </Box>
    );

}