import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

 
export default  function Top_bar (props){
    
    const [Info,SetInfo] = useState("1");

    const tabChange = (event, newValue) => {
          SetInfo(newValue);
    };

     //let tab4 = props.IsAuth ?  <Tab label="Личный кабинет" value="4" /> : <Tab label="Личный кабинет" value="4" disabled/>
    
    return(
               
        <TabContext value={Info} >
        <Box sx={{
          borderBottom: 1, 
          borderColor: 'divider',
          alignContent:'center',
          bgcolor:colors.blue[500],
          paddingLeft: "10%",
          paddingRight:"10%"}}>
          <TabList onChange={tabChange} >
            <Tab label="Главная страница" value="1" />
            <Tab label="Курсы" value="2" />
            <Tab label="О нас" value="3" />
            <Tab label="Личный кабинет" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{props.MainPageText}</TabPanel>
        <TabPanel value="2">{props.CoursesText}</TabPanel>
        <TabPanel value="3">{props.AboutUsText}</TabPanel>
        <TabPanel value="4">{props.PersonalAccountText}</TabPanel>
      </TabContext>


        
        
        )
}

