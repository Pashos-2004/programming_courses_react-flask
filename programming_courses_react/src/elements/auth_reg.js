import React,{useEffect,useState} from 'react';
import { Box,colors,TextField,Button,Checkbox } from '@mui/material';



 
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
                error={Passwd2Error}
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

    const validateEmail = (email) => {
        return EMAIL_REGEXP.test(email)
    };

   

   
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
                
                onChange={handleChangeIsReg}
            />
            <label>Регистрация?</label>
            <br/>
            <Button variant="contained" >Сохранить изменения</Button>
        </div>
    );
}
