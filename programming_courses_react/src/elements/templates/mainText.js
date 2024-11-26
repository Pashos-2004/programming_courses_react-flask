import React,{useEffect,useState} from 'react';
import { Box,colors } from '@mui/material';
import "./mainText.css"
 
export default  function MainText (props){

    return(
        <Box className="MainPage_text" alignContent={"left"}>
            <h2>Добро пожаловать в PPProgram — твой старт в мир программирования!</h2>
            <p>Хотите научиться создавать веб-приложения, разрабатывать мобильные приложения или погрузиться в анализ данных? PPProgram — это курсы, которые помогут вам освоить программирование с нуля или углубить уже имеющиеся знания.</p>
<h3>Почему стоит выбрать PPProgram?</h3>
<ul >
    <li>Практика с первого дня. Учимся не только теории, но и сразу проверяем знания в тестах. &#128165;&#128165;</li>
    <li>Актуальные технологии. Мы обучаем только тому, что действительно востребовано в IT. &#128104;&#8205;&#128187;</li>
    <li>Гибкий график. Учитесь когда захотите, и откуда захотите! 	&#129517;</li>
    <li>Обучение бесплатное. Мы работаем на чистом энтузиазме, и вашей поддержке.	&#128151;&#129297; </li>
</ul>

<h3>Вот некоторые курсы, которые будут представлены на сайте:</h3>
<ul>
<li>Веб-разработка: от HTML до полного создания сайтов.</li>
<li>Python и анализ данных: начните путь в Data Science.</li>
<li>Мобильная разработка: создавайте приложения для iOS и Android.</li>
<li>Основы программирования: идеальный старт для новичков.</li>
</ul>
Вместе с PPProgram вы обретете новые знания, навыки и возможности. Начните прямо сейчас — ваш путь в IT начинается здесь!
<h4>Присоединяйтесь к нам и станьте программистом с PPProgram!</h4>



            
     
        </Box>
    );

}