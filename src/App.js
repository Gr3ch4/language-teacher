import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import {useFetch} from './hooks/useFetch'
import './App.css';
import lamp from './img/lamp.svg'
import chair from './img/chair.svg'
import table from './img/table.svg'


// import required modules
import { Navigation } from 'swiper/modules';
import CreateNewWord from './components/CreateNewWord';

const images = {
  lamp: lamp,
  chair: chair,
  table: table
};


const onSpeech = (e) => {
  const speechWord = document.querySelector('.swiper-slide-active b').textContent

  const speech = new SpeechSynthesisUtterance(speechWord);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}


export default function App() {
  const [openModal, setOpenModal] = useState(false)
  const { data, isPending, error} = useFetch('http://localhost:8000/words')

  const onShowModal = () => {
    setOpenModal(true)
  }
  
  const onCloseModal = () => {
    setOpenModal(true)
  }
  

  return (
    <div className='App'>
      <CreateNewWord 
        isOpen={openModal}
        onClose={onCloseModal}
      />
      <button onClick={onSpeech} className='speech-btn'></button>
      <Swiper loop={true} navigation={true} modules={[Navigation]} className="swiper">
        {error && <p>{error}</p>}
        {isPending && <p>Loading...</p>}
        {data && data.map(word => (
          <SwiperSlide key={word.id}>
            <div className="slide-content">
              <img src={images[word.word]} className='swiper-img'/>
              <b>{word.word}</b>
              <i>{word.translation}</i>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={onShowModal}>+</button>
    </div>
  );
}
