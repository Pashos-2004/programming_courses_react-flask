import logo from './logo.svg';
import './App.css';
import CourseMenu from './elements/courseMenu.js';
import MainPage from "../src/elements/mainPage.jsx"
import Auth_reg from "./elements/auth_reg.js"
import PageWithText from './elements/templates/pageWithText.js';
import PageWithVideo from './elements/templates/pageWithVideo.js';

function App() {
  console.log(window.location.href)
  console.log("http://localhost:3000/"== window.location.href)
  
  return (
    <div className="App">  
       <PageWithVideo IsAdmin={true} number={2} maxNumber={9}/>

    </div> 
    
  );
}

export default App;
 