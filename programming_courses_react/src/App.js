import logo from './logo.svg';
import './App.css';
import CourseMenu from './elements/courseMenu.js';
import MainPage from "../src/elements/mainPage.jsx"
import Auth_reg from "./elements/auth_reg.js"
import PageWithText from './elements/templates/pageWithText.js';
import PageWithVideo from './elements/templates/pageWithVideo.js';

function App() {
  console.log(window.location.href)
  //console.log("http://localhost:3000/"== window.location.href)
  let cur_url =  window.location.href.replace("http://localhost:3000/","")
  console.log(cur_url=="auth-reg");
 
  if(cur_url=="MainPage" || cur_url == "/"){
    return (
      <div className="App">  
      <MainPage/>
    </div> )
  }else if(!(sessionStorage.getItem("isAuth")=="true")){
    console.log("fdsfsdf")
    if(cur_url=="auth-reg"){
      return (
        <div className="App">  
        <Auth_reg/>
      </div> 
      );
    }
    else{
        window.location.href = "http://localhost:3000/MainPage"
    }
  }else{
    cur_url = cur_url.split("/")
    console.log(cur_url)

    if(cur_url[0]=="courseMenu"){
      return <CourseMenu/>
    }

  
    //window.location.href = "http://localhost:3000/MainPage"
    
  }
  
  


}

export default App;
 