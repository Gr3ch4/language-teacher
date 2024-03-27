import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Lamp from './img/lamp.svg'
import Table from './img/table.svg'
import Chair from './img/chair.svg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './App.css';

// import required modules
import { Navigation } from 'swiper/modules';

const onSpeech = (e) => {
  const speechWord = document.querySelector('.swiper-slide-active b').textContent

  const speech = new SpeechSynthesisUtterance(speechWord);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

const words = [
  ['lamp', 'лампа', Lamp],
  ['table', 'стол', Table],
  ['chair', 'стул', Chair]
];

export default function App() {
  return (
    <div className='App'>
      <button onClick={onSpeech} className='speech-btn'></button>
      <Swiper loop={true} navigation={true} modules={[Navigation]} className="swiper">
        {words.map(word => (
          <SwiperSlide key={word[0]}>
            <div className="slide-content">
              <img src={word[2]} className='swiper-img'/>
              <b>{word[0]}</b>
              <i>{word[1]}</i>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
