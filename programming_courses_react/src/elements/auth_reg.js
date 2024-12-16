import React,{useEffect,useState} from 'react';
import { Box,colors,TextField,Button,Checkbox } from '@mui/material';
import { proxy } from '../consts/proxy';


 
export default  function Auth_reg (props){

    const [IsReg,SetIsReg] = useState(false);
    const [EmailError,SetEmailError] = useState(false);
    const [PasswdError,SetPasswdError] = useState(false);
    const [Passwd2Error,SetPasswd2Error] = useState(false);
    const [Reg,setReg] = useState(<div></div>)

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const handleChangeIsReg = (event) => {
        SetIsReg(event.target.checked)
       
        if(event.target.checked){
            setReg(<div >
            <TextField
                
                id="reg_passwd_2"
                label="Ещё раз"
                type="password"
                helperText="Повторите ваш пароль"
                margin="dense"
            />
            <br/>
        </div>)
        }else{
            setReg(<div></div>);
        }
    };

    function CheckFields(){
        let email = document.getElementById("Email_Field").value
        let passwd = document.getElementById("passwd").value

        SetEmailError(!validateEmail(email));
        SetPasswdError(!validatePasswd(passwd));
        
        if(IsReg){
            let passwd2 = document.getElementById("reg_passwd_2").value
            //console.log(!validatePasswd2(passwd,passwd2))
            SetPasswd2Error(!validatePasswd2(passwd,passwd2));
            SetPasswdError(Passwd2Error);
        }
    }

    const validateEmail = (email) => {
        return EMAIL_REGEXP.test(email)
    };
    const validatePasswd = (passwd) => {
        if(passwd.length <8 && IsReg ){
            alert("Пароль слишком простой, нужно хотя бы 8 символов")
            return false;
        }
        return true
    } 
    const validatePasswd2 = (passwd1,passwd2) => {
        if(passwd1!=passwd2){
            alert("Пароли не совпадают")
        }
        
        return (!PasswdError) && passwd1===passwd2
    } 
   
    async function authBtnOnClick(){
        let email = document.getElementById("Email_Field").value
        let passwd = document.getElementById("passwd").value

        let response = null;
        CheckFields();

        if(EmailError){return}
        if(PasswdError){return}
        if(Passwd2Error){return}
        //console.log(navigator.userAgent);  
        
        
        
        

                

            let values = {"email":email,"password":passwd,"device":navigator.userAgent.toString()}
            try
            {
                //console.log(JSON.stringify(values))
                //response = await proxy.post("/auth_user", JSON.stringify(values, null));
                if(!IsReg){
                    response = await proxy.post("/auth_user", JSON.stringify(values, null));
                }else{
                    response = await proxy.post("/reg_user", JSON.stringify(values, null));
                }
                let data = response?.data;
                console.log(response?.data);
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
                    window.location.href = "http://localhost:3000/MainPage"
                }
            }
            catch(e)
            {
                console.log(e);
            }
            
        
    }

    
   
    return(
        <div className='AuthPage'>
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
                error={PasswdError}
                id="passwd"
                label="Пароль"
                type="password"
                helperText="Введите ваш пароль"
                margin="dense"
            />
            <br/>

            {Reg}

            <Checkbox
                id="IsRefCheckBox"
                onChange={handleChangeIsReg}
            />
            <label>Регистрация?</label>
            <br/>
            <Button variant="contained" onClick={authBtnOnClick} >Отправить</Button>
        </div>
    );
}
