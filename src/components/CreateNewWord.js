import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import './CreateNewWord.css';

export default function CreateNewWord({ isOpen, onClose }) {
  const { postData } = useFetch('http://localhost:8000/words', 'POST');
  const [newWord, setNewWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    postData({ newWord, translation });
    onClose();
  };

  const closeHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // время анимации закрытия модального окна
  };

  return (
    <div className={`Modal ${isOpen ? 'opened' : ''} ${isClosing ? 'isClosing' : ''}`}>
      <div className='overlay' onClick={closeHandler}>
        <div className='content' onClick={e => e.stopPropagation()}>
          <form onSubmit={onSubmit}>
            <label>
              <span>Введите новое слово</span>
              <input onChange={e => setNewWord(e.target.value)} value={newWord} />
            </label>
            <label>
              <span>Введите перевод</span>
              <input onChange={e => setTranslation(e.target.value)} value={translation} />
            </label>
            <button>Добавить новое слово</button>
          </form>
        </div>
      </div>
    </div>
  );
}