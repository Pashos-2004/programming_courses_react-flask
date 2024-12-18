import logo from './logo.svg';
import './App.css';
import CourseMenu from './elements/courseMenu.js';
import MainPage from "../src/elements/mainPage.jsx"
import Auth_reg from "./elements/auth_reg.js"
import ShowPage from './elements/templates/showPage.js';
import PageWithText from './elements/templates/pageWithText.js';
import PageWithVideo from './elements/templates/pageWithVideo.js';
import QuestionPageWithOneAnswer from './elements/templates/questionPageWithOneAnswer.js';

function App() {
  console.log(window.location.href)
  //console.log("http://localhost:3000/"== window.location.href)
  let cur_url =  window.location.href.replace("http://localhost:3000/","")
  //console.log(cur_url=="auth-reg");
 
 // return(<div className="App"> <QuestionPageWithOneAnswer IsAdmin={true} number={2} maxNumber={5}/></div>)

  if(cur_url=="MainPage" || cur_url == ""){
    return (
      <div className="App">  
      <MainPage/>
    </div> )
  }else if(!(sessionStorage.getItem("isAuth")=="true")){
    
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
    

    if(cur_url[0]=="courseMenu" && cur_url.length==2){
      
      return <div className="App"> <CourseMenu courseID={cur_url[1]}/>
      </div>
    }else if(cur_url[0]=="course" && cur_url.length==4 ){
      
      if(cur_url[2]=="page"){
        
        return(
        <div className="App">
           
          <ShowPage courseID={cur_url[1]} num={cur_url[3]} />
        </div>);
      }else{
        window.location.href = "http://localhost:3000/MainPage"
      }
      
    }
    else{
       window.location.href = "http://localhost:3000/MainPage"
    }

  
    //window.location.href = "http://localhost:3000/MainPage"
    
  }
  
  


}

export default App;
 