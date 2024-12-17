import React,{useEffect,useState} from 'react';
import { Box,colors,TextField,Stack,Button, MenuItem,InputLabel,FormControl,Select,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import Logo from './templates/logo_template.js';
import ShowPages from './templates/showPages.js';
import { proxy } from '../consts/proxy.js';
import MenuRowPage from './templates/menuRowPage.js';
import "./courseMenu.css"

export default  function CourseMenu (props){

    
    const [Pages,SetPages] = useState([])
    const [Title, setTitle] = React.useState();
    const [TitleError, setTitleError] = React.useState(false);
    const [Description, setDescription] = React.useState();
    const [DescriptionError, setDescriptionError] = React.useState(false);
    const [TypeOfPage,SetTypeOfPage]= React.useState();
    const [TypeOfPageError,SetTypeOfPageError]= React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleTypeOfPage = (event) => {
        
        SetTypeOfPage(event.target.value);
    };
    const handleChangeTitle = (event) => {
        
        setTitle(event.target.value);
    };
    const handleChangeDescription = (event) => {
        
        setDescription(event.target.value);
    };
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function SplitIntoParagraphs(str,divider){
        let res = str.split(divider).map(item => <p className='CourseDescription'>{item}<br/></p>)
        return res
    }
    async function SaveBtnOnClick(){
        let response;
            
            let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id"),"title":Title.split("+").join("|{|PLUS|}|"),"description":Description.split("+").join("|{|PLUS|}|")}
            let isFieldsOK=true
            
            if(Title=="" || Title==undefined) {
                setTitleError(true)
                isFieldsOK=false   
            }
            if(Description=="" || Title==Description) {
                setDescriptionError(true)
                isFieldsOK=false
            }
            
            if(!isFieldsOK) return;
            try
            {
                response = await proxy.post("/change_course_main_info", JSON.stringify(values, null));
                
                
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
                    alert("Успешная смена")
                    document.location.href = document.location.href 
                }
                
                
            }
            catch(e)
            {
                alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
                console.log(e);
                //window.location.href = "http://localhost:3000/MainPage"
            }
    }
    async function AddPageOnClick(){
        let response;
        
        let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id"),"page_type":TypeOfPage}
        
        if(TypeOfPage==undefined) {
            SetTypeOfPage(true)
            return  
        }
        
        
        try
        {
            response = await proxy.post("/create_page", JSON.stringify(values, null));
            
            
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
                alert("Успешно добавлено")
                document.location.href = document.location.href 
            }
            
            
        }
        catch(e)
        {
            alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
            console.log(e);
            //window.location.href = "http://localhost:3000/MainPage"
        }

       
    }

    async function deleteCourseOnclick(){
        let response;
       
        let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id"),"page_type":TypeOfPage}
        
        handleClose();
        
        try
        {
            response = await proxy.post("/delete_course", JSON.stringify(values, null));
            
            
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

    useEffect(()=>{async function fetch_pages()  {
            
        
            
            let response;
            
            let values = {"token":sessionStorage.getItem("token"),"course_id":props.courseID,"device":navigator.userAgent.toString(),"_id":sessionStorage.getItem("user_id")}
            
            try
            {
                response = await proxy.post("/get_pages", JSON.stringify(values, null));
                
                
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
                
                setTitle(data["title"].split("|{|PLUS|}|").join("+"));
                if(sessionStorage.getItem("isAdmin")=="true") {setDescription(data["description"].split("|{|PLUS|}|").join("+"));}
                else{setDescription(SplitIntoParagraphs(data["description"].split("|{|PLUS|}|").join("+") ,"\n"));}
                
                SetPages(data["pages"].map((el)=>{
                    
                    return <MenuRowPage title={el["title"] } pageNum={el["pageNum"]} courseID={props.courseID}/>
                }))
                //SetPages(data["pages"])
                //SetCourses(courses.map((el)=>{ return <Course  courseText={el.get("courseText")} courseTitle={el.get("courseTitle")} picture={pictures.get(el.get("picture"))} id={el.get("id")}/>}))
                
                
            }
            catch(e)
            {
                alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
                console.log(e);
                //window.location.href = "http://localhost:3000/MainPage"
            }
    
            
          }fetch_pages();}, []);
    if(sessionStorage.getItem("isAdmin")=="true"){
        return(
            <div>
                <Stack direction={'row'} paddingLeft={"44%"}>
                <Logo/>
                </Stack>
                <Box sx={{ paddingLeft:"30%", paddingRight:"30%",alignItems:'center'}}>
                    <label>Заголовок</label>
                <TextField
                    id="title"
                    //label="Заголовок"
                    fullWidth
                    margin="dense"
                    error={TitleError}
                    value={Title}
                    onChange={handleChangeTitle}
                />
                <br/>
                <label>Описание</label>
                <TextField
                    id="description"
                    //label="Описание"
                    error={DescriptionError}
                    multiline
                    fullWidth
                    maxRows={20}
                    defaultValue={Description}
                    value={Description}
                    onChange={handleChangeDescription}
                    margin="dense"
                    
                />
                <br/>
                <br/>
                <Box > <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
                <br/>
                </Box>
                </Box>
                <Box paddingLeft={"20%"} paddingRight={"20%"}  >
                <br/>
                <Box sx={{  maxWidth: 300 , paddingLeft : "36%",  paddingRight:"20%" } }>
                <FormControl fullWidth>
                    <InputLabel id="type_of_page_select_label">Тип страницы</InputLabel>
                    <Select
                    labelId="type_of_page_select_label"
                    id="type_of_page_select"
                    value={TypeOfPage}
                    label="Type"
                    error={TypeOfPageError}
                    onChange={handleTypeOfPage}
                    //defaultValue={10}
                    >
                    
                    <MenuItem value={"text_page"}>Текстовая</MenuItem>
                    <MenuItem value={"video_page"}>Видео</MenuItem>
                    <MenuItem value={"question_page_with_one_answer"}>Один вопрос с полем ввода</MenuItem>
                    
                    
                </Select>
                </FormControl>
                </Box>
                <br/>
                 <Button  variant="contained" onClick={AddPageOnClick} >Добавить</Button>
                <br/>
                
                    <ShowPages courseID={props.courseID} pages={Pages}/>
    
                </Box>
                <br/>
                <table border={0} align='center'  className='PagesMenuTable' >
                        {Pages}
                </table>
                <br/>
                <Button  variant="contained" onClick={()=>{document.location.href="http://localhost:3000/MainPage"}} >На главную</Button>
                <br/>
                <br/>
                <br/>
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
                <br/>
                <br/>
            </div>
        );
    }else{
        return(
            <div>
                <Stack direction={'row'} paddingLeft={"44%"}>
                <Logo/>
                </Stack>
    
                <Box paddingLeft={"20%"} paddingRight={"20%"}  >
                    <h2>{Title}</h2>
                    <p className='CourseDescription'>{Description}</p>
                    <table border={0} align='center'  className='PagesMenuTable' >
                        {Pages}
                    </table>
                    <br/>
                    <br/>
                    <br/>
                    <Button  variant="contained" onClick={()=>{document.location.href="http://localhost:3000/MainPage"}} >На главную</Button>
    
                </Box>
    
    
    
            </div>
        );
    }
    

}