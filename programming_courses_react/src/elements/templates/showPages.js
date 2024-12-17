import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import MenuRowPage from './menuRowPage';


export default  function ShowPages(props){
    const [Pages,SetPages] = useState(<h1>Нет страниц</h1>);
    

    useEffect(() => {

        /*let arr=[];
        arr.push(<MenuRowPage title="Первая страница"   pageNum={1} />);
        arr.push(<MenuRowPage title="Вторая страница"  pageNum={2} />);
        arr.push(<MenuRowPage title="Первая страница" pageNum={3} />);
        arr.push(<MenuRowPage title="Первая страница"  pageNum={4} />);
        arr.push(<MenuRowPage title="Первая страница"  pageNum={5} />);
        arr.push(<MenuRowPage title="Первая страница" pageNum={6}  course_id={}/>);
        */
       console.log(props.pages)
       if(props.pages.length!=0){
        //SetPages(props.pages.map(item=> item))
       }

    }, []);
    return(
        <div>
            <table border={0} align='center'  className='PagesMenuTable' >
                {Pages}
            </table>
           
        </div>
    );



}