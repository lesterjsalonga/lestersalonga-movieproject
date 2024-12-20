import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const words = ['Movie', 'Series', 'TV Show', 'Anime'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      setTypedText(prev => 
        isDeleting 
          ? prev.slice(0, -1) 
          : currentWord.slice(0, prev.length + 1)
      );

      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      }

      if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex, words]);

  return (
    <div className='landing-containerr'>
      <div className='landing-content'>
        <h1 className='page-title'>CineSphere</h1>
        <div className='typing-animation'>
          Explore Your Favorite <span className='typed-text'>{typedText}</span>
          <span className='cursor'>|</span>
        </div>
        <p className='landing-description'>
          The ultimate online hub for film lovers! Whether you're a casual viewer or a dedicated cinephile, CineSphere is designed to enhance your movie-watching experience by providing a rich database of films from every genre and era.
        </p>
        <button 
          className='explore-button btn'
          onClick={() => navigate('/home')}
        >
          Explore Movies
        </button>
      </div>
    </div>
  );
};

export default Landing;