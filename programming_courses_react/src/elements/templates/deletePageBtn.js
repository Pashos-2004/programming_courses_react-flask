import React,{ useEffect, useState }  from 'react';
import Logo from './logo_template.js';
import { Box,Button,colors,TextField,MenuItem,InputLabel,FormControl,Select,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import { proxy } from '../../consts/proxy.js';
export default function DeletePageBtn(props){
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    async function deleteCourseOnclick() {
        handleClose();

        let response;
               
                let values = {"token":sessionStorage.getItem("token"),"course_id":props.course_id,"page_id":props.page_id,"device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id")}
                
                handleClose();
                
                try
                {
                    response = await proxy.post("/delete_page", JSON.stringify(values, null));
                    
                    
                    let data = response?.data
                   
                    if(data["status"]===404){
                        alert(data["info"]);
                        document.location.href = "http://localhost:3000/MainPage"
                    }
                    if(data["status"]===403){
                        alert(data["info"]);
                        sessionStorage.clear()
                        document.location.href = "http://localhost:3000/MainPage"
                    }
                    
                    if(data["status"]===200){
                        alert("Успешно удалено")
                        window.location.href = "http://localhost:3000/MainPage"
                    }
                    
                    
                }
                catch(e)
                {
                    alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
                    console.log(e);
                    //window.location.href = "http://localhost:3000/MainPage"
                }

    }
    return(<Box paddingLeft={"50%"}>
        <Box paddingLeft={"40%"}>
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        Удалить Страницу!
                    </Button >
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                            <DialogTitle id="alert-dialog-title">
                            {"Вы точно хотите удалить курс ?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button color="success" onClick={handleClose}>Отказаться</Button>
                            <Button color="error" onClick={deleteCourseOnclick} autoFocus>
                                Подтвердить
                            </Button>
                            </DialogActions>
                        </Dialog>

                </Box>
        </Box>
    );

}