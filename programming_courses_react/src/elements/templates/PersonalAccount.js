import React,{useEffect,useState} from 'react';
import { Box,TextField,colors,Button } from '@mui/material';
import { proxy } from '../../consts/proxy';
import "./personalAccount.css"
import { common } from '@mui/material/colors';

 
export default  function PersonalAccount (props){

    const [EmailError,SetEmailError] = useState(false);
    const [OldPasswdError,SetOldPasswdError] = useState(false);
    const [NewPasswdError1,SetNewPasswdError1] = useState(false);
    const [NewPasswdError2,SetNewPasswdError2] = useState(false);


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

       
        SetOldPasswdError(false);
        SetNewPasswdError1(false);
        SetNewPasswdError2(false);
        
        

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
    async function saveBtnOnClick(){
        if(validateForm()){
            console.log("Успешная валидация")

            
            let passwd = document.getElementById("new_passwd_1").value
            let old_passwd = document.getElementById("old_passwd").value
    
            let response = null;
            let values = {"_id":sessionStorage.getItem("user_id"),"old_password":old_passwd,"password":passwd,"token":sessionStorage.getItem("token"),"device":navigator.userAgent.toString()}
            try
            {
                console.log(JSON.stringify(values))
                //response = await proxy.post("/auth_user", JSON.stringify(values, null));
                
                response = await proxy.post("/change_information", JSON.stringify(values, null));
                
                let data = response?.data;
                console.log(response?.data);
                if(data["status"]==403){
                    sessionStorage.clear();
                    alert(data["info"]);
                    document.location.href = "/MainPage"
                }
                if(data["status"]==401){
                    alert(data["info"]);
                }
                if(data["status"]==200){
                    sessionStorage.setItem("user_id",data["user_id"]);
                    sessionStorage.setItem("token",data["token"]);
                    sessionStorage.setItem("isAdmin",data["isAdmin"]);
                    sessionStorage.setItem("email",data["email"])
                    sessionStorage.setItem("isAuth",true);
                    //console.log(sessionStorage);
                    alert("Смена прошла успешно")
                    window.location.href = "http://localhost:3000/MainPage"
                }
            }
            catch(e)
            {
                console.log(e);
            }

        }
    }

    function exitBtnOnClick(){
        sessionStorage.clear()
        window.location.href = "http://localhost:3000/MainPage"

    }

    function authBtnOnClick(){
        window.location.href = "http://localhost:3000/auth-reg"

    }

    if(props.IsAuth){
    return(
        <Box className="PersonalAccount" alignContent={"left"}>
            <h1>Добро пожаловать, рады видеть вас снова!</h1>
            
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
            <br/>
        
            <br/>
            <Button variant="outlined" color="error" onClick={exitBtnOnClick}>Выйти из аккаунта</Button>
            
        </Box>
    );}
    else{
        return(
            <Box className="PersonalAccount" alignContent={"left"}>
            <Button variant="contained" onClick={authBtnOnClick}>Авторизоваться</Button>
            </Box>

        );
    }

}