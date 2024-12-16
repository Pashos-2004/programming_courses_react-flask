import React,{useEffect,useState} from 'react';
import { Box,colors,TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import Course from "./course.js"
import cPlusPicrure from "../../pictures/c++.png"
import cSharpPicture from "../../pictures/cSh.png"
import pythonPicture from '../../pictures/python.png'
import javaPicture from "../../pictures/java.png"
import def from "../../pictures/default.png";
import { proxy } from '../../consts/proxy';

import "./showCourses.css"


export default  function ShowCourses(props){
    const [Courses,SetCourses] = useState(<h1>Что-то пошло не так и курсы не загрузились</h1>);
    const [Picture, setPicture] = React.useState();
    const [PictureError, setPictureError] = React.useState(false);
    const [Title, setTitle] = React.useState();
    const [TitleError, setTitleError] = React.useState(false);
    const [Description, setDescription] = React.useState();
    const [DescriptionError, setDescriptionError] = React.useState(false);
    const handleChangePicture = (event) => {
        
        setPicture(event.target.value);
    };
    const handleChangeTitle = (event) => {
        
        setTitle(event.target.value);
    };
    const handleChangeDescription = (event) => {
       
        setDescription(event.target.value);
    };

    


    const AdminMenu = sessionStorage.getItem("isAdmin")=="true" ? <div className='adminMenu'>
                 <Box sx={{ maxWidth: 200}}>
                <FormControl fullWidth>
                    <InputLabel id="picture_select_label">Логотип</InputLabel>
                    <Select
                    labelId="picture_select_label"
                    id="picture_select"
                    value={Picture}
                    label="Picture"
                    error={PictureError}
                    onChange={handleChangePicture}
                    //defaultValue={10}
                    >
                    
                    <MenuItem value={"def"}><img src={def} width={50} height={50}></img></MenuItem>
                    <MenuItem value={"c++"}><img src={cPlusPicrure} width={50} height={50}></img></MenuItem>
                    <MenuItem value={"c#"}><img src={cSharpPicture} width={50} height={50}></img></MenuItem>
                    <MenuItem value={"python"}><img src={pythonPicture} width={50} height={50}></img></MenuItem>
                    <MenuItem value={"java"}><img src={javaPicture} width={50} height={50}></img> </MenuItem>
                    
                </Select>
                </FormControl>
                </Box>
                <TextField
                    id="Title"
                    label="Заголовок"
                    fullWidth
                    margin="dense"
                    error={TitleError}
                    value={Title}
                    onChange={handleChangeTitle}
                />
                <br/>
                <TextField
                    id="description"
                    label="Описание"
                    error={DescriptionError}
                    multiline
                    fullWidth
                    maxRows={20}
                    value={Description}
                    onChange={handleChangeDescription}
                    margin="dense"
                    
                />
                <br/>
                <br/>
                <Button  variant="contained" onClick={SaveBtnOnClick} >Сохранить</Button>
                <br/>
                <br/>


    </div>:<></>

    async function SaveBtnOnClick(){
        setPictureError(false);
        setTitleError(false);
        setDescriptionError(false);

        console.log(Title)
        
        if(Picture === undefined) setPictureError(true);
        if(Title === undefined || Title==="") setTitleError(true);
        if(Description === undefined || Description==="") setDescriptionError(true);
        let values = {"_id":sessionStorage.getItem("user_id"),"picture":Picture,"title":Title,"description":Description,"token":sessionStorage.getItem("token"),"device":navigator.userAgent.toString()}
        let response;
        try
        {
            //console.log(JSON.stringify(values))
            //response = await proxy.post("/auth_user", JSON.stringify(values, null));
            
            response = await proxy.post("/create_course", JSON.stringify(values, null));
            
            let data = response?.data;
            console.log(response?.data);
            if(data["status"]===403){
                sessionStorage.clear();
                alert(data["info"]);
                document.location.href = "/MainPage"
            }
            if(data["status"]===401){
                alert(data["info"]);
            }
            if(data["status"]===200){
                
                
                alert("Успешно добавлено")
                window.location.href = "http://localhost:3000/MainPage"
            }
        }
        catch(e)
        {
            console.log(e);
        }
        
    }
    //let arr = [];
    //let first = new Map()
    ///first.set("id",26)
    //first.set("courseDescription","sdhtrehf")
    //first.set("courseTitle","dfrjtfg")
    //first.set("picture",def)
    //arr.push(first)
    

    //let buff = arr.map((el)=>{return <Course  courseText={el.get("courseText")} courseTitle={el.get("courseTitle")} picture={el.get("picture")} id={el.get("id")}   />})

    
    
    

    useEffect(()=>{async function fetch_courses()  {
        let pictures;
        pictures =new Map();
        pictures.set("def",def);
        pictures.set("c++",cPlusPicrure);
        pictures.set("c#",cSharpPicture);
        pictures.set("java",javaPicture);
        pictures.set("python",pythonPicture);
    
        
        let response;
        try
        {
            response = await proxy.post("/get_courses", JSON.stringify({}, null));
            
            let data = response?.data;
            
            let courses = [];
           
            for(let i =0;i<(data['_id']).length;i++){
                let buff = new Map()
                buff.set("id",data['_id'][i])
                buff.set("courseDescription",data['description'][i])
                buff.set("courseTitle",data['title'][i])
                buff.set("picture",data['picture'][i])
                courses.push(buff);
            }
            console.log(courses)
            
            
            SetCourses(courses.map((el)=>{
                
                
                return <Course  courseText={el.get("courseText")} courseTitle={el.get("courseTitle")} picture={pictures.get(el.get("picture"))} id={el.get("id")}/>}))
            
            
        }
        catch(e)
        {
            alert("Произошла ошибка сервера!\n Мы очень стараемся ей устранить")
            console.log(e);
            window.location.href = "http://localhost:3000/MainPage"
        }

        
      }fetch_courses();}, []);

    return (
        <div>

            {AdminMenu}
            {Courses}
            
            
        </div>
    )
}