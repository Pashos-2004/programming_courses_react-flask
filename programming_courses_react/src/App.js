import logo from './logo.svg';
import './App.css';
import CourseMenu from './elements/courseMenu.js';
import MainPage from "../src/elements/mainPage.jsx"


function App() {
  console.log(window.location.href)
  console.log("http://localhost:3000/"== window.location.href)
  
  return (
    <div className="App">
       
       
       <MainPage  />
    </div> 
    
  );
}

export default App;
