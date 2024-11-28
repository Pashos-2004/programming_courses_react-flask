import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import MenuRowPage from './menuRowPage';


export default  function ShowPages(props){
    const [Pages,SetPages] = useState(<h1>Что-то пошло не так и страницы не загрузились</h1>);
    useEffect(() => {

        let arr=[];
        arr.push(<MenuRowPage title="Первая страница" isViewed={true} id={1} />);
        arr.push(<MenuRowPage title="Вторая страница" isViewed={false} id={2} />);
        arr.push(<MenuRowPage title="Первая страница" isViewed={true} id={3} />);
        arr.push(<MenuRowPage title="Первая страница" isViewed={true} id={4} />);
        arr.push(<MenuRowPage title="Первая страница" isViewed={true} id={5} />);
        arr.push(<MenuRowPage title="Первая страница" isViewed={true} id={6} />);
        SetPages(arr.map(item=> item))
     }, []);
    return(
        <div>
            <table border={0} align='center'  className='PagesMenuTable' >
                {Pages}
            </table>
           
        </div>
    );



}