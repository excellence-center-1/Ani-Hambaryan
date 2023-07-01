import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export const GuessWord = () => {
  const location = useLocation();
  const token = location.state?.token || '';
  const inputs = [];
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [count, setCount] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [levelId, setLevelId] = useState(1);
  const [prevQuestionIds, setPrevQuestionIds] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (count >= 5) {
      setLevelId(2);
      setMessage1('Level 2');
    } else if (count >= 8) {
      setLevelId(2);
      setMessage1('Level 3');
    } else {
      setMessage1('Level 1');
    }
  }, [count]);
  const fetchRandomWord = async () => {
    try {
      const response = await fetch(`http://localhost:4000/random-word?level_id=${levelId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exclude: prevQuestionIds })
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentWord(data.question.word);
        setCurrentQuestion(data.question.question)
        setCurrentQuestionId(data.question.id);
        // navigate('/game', { state: { token } });
      } else {
        console.error('Error retrieving random word', response.status);
      }
    } catch (error) {
      console.error('Error retrieving random word', error);
    }
  };


  useEffect(() => {
    fetchRandomWord();

    setTimeout(() => {
      navigate('/game', { state: { token } });
    }, 1000);
  }, [levelId]);

  const handleInput = (e) => {
    const index = parseInt(e.target.name); //տալիս է զանգվածի սիմվոլին արժեք
    const character = e.target.value;

    setGuess((prevGuess) => {
      const updatedGuess = [...prevGuess]; //հին զանգվաշը կրկնօրինակում է 
      updatedGuess[index] = character;
      return updatedGuess;
    });
  };


  for (let i = 0; i < currentWord?.length; i++) {
    inputs.push(<input key={i} name={i.toString()} type="text" value={guess[i] || ''} onChange={(e) => handleInput(e)} className='input-field me-2 rounded-2 bg-info bg-opacity-10 border border-info inp' />);

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const guessWord = guess.join('');
    if (guessWord === currentWord) {
      setMessage('You guessed the word');
      setCount((prevCount) => prevCount + 1);

    } else {
      setMessage('You didn\'t guess the word');
      setCount((count > 1) ? (prevCount) => prevCount - 1 : count);
    }
    setGuess('');
    setPrevQuestionIds((prevIds) => [...prevIds, currentQuestionId]);
    if (count === 5) {
      await fetch('http://localhost:4000/users_levels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ level_id: 2, score: count })
      });
    } else if (count === 8) {
      await fetch('http://localhost:4000/users_levels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ level_id: 3, score: count })
      });
    }

    fetchRandomWord();

  };

  const handleSubmitEnd = (e) => {
    e.preventDefault();
    navigate('/login')
    return;
  };

  return (
    <div className="container mt-5">
      <h1 className='mt-5 p-5'>================= <span className="text-info">Word guessing game</span> =================</h1>
      <h4><span className="text-info">Question:</span> {currentQuestion}</h4>
      <div className='d-flex justify-content-center container mt-5'>

        {inputs}

      </div>
      <div>
        <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmit}>Submit</button>
        <input value={`score: ${count}`} readOnly className="mt-3 btn btn-info ms-2 count" />
        <h5>{message}</h5>
        <h5>{message1}</h5>
        <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmitEnd}>LogOut</button>

      </div>
      <h4 className="mt-5 mb-2 ">Subscription</h4>
      <input type="radio" className="btn-check m-2" id="btncheck1" autocomplete="off" name="choose" />
      <label className="btn btn-outline-info m-2" for="btncheck1">Open one letter</label>
      <input type="radio" className="btn-check m-2" id="btncheck2" autocomplete="off" name="choose" />
      <label className="btn btn-outline-info m-2" for="btncheck2">Open two letter</label>
    </div>
  );
}

