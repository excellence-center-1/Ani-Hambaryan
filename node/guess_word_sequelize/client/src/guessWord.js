import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
export const GuessWord = () => {
    const inputs = [];
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(1);
    const [currentWord, setCurrentWord] = useState('');
    const [currentquestion, setCurrentQuestion] = useState('')
    const [user_id, setUser_id] = useState(null); 
    const [level_id, setLevel_id] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:4000/userid");
            if (response.ok) {
              const data = await response.json();
              setUser_id(data.user_id);
              setLevel_id(data.level_id);
            } else {
              console.log("Error retrieving user data");
            }
          } catch (error) {
            console.error("Error retrieving user data", error);
          }
        };
    
        fetchUserData();
      }, []);
    const fetchRandomWord = async () => {
        try {
            const response = await fetch('http://localhost:4000/random-word', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();

                setCurrentWord(data.question.word);
                setCurrentQuestion(data.question.question)
            } else {
                console.error('Error retrieving random word', response.status);
            }
        } catch (error) {
            console.error('Error retrieving random word', error);
        }
    };


    useEffect(() => {
        fetchRandomWord();
      }, []);

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
        if (count < 5) {
            setLevel_id(1); // Level 1 - Beginner
          } else if (count < 8) {
            setLevel_id(2); // Level 2 - Mid1
          } else {
            setLevel_id(3); // Level 3 - Mid2
          }
    fetchRandomWord();
     
      };

    const handleSubmitEnd = (e) => {
        e.preventDefault();
        navigate('/login')
    };

    return (
        <div className="container mt-5">
            <h1 className='mt-5 p-5'>================= <span className="text-info">Word guessing game</span> =================</h1>
            <h4><span className="text-info">Question:</span> {currentquestion}</h4>
            <div className='d-flex justify-content-center container mt-5'>

                {inputs}

            </div>
            <div>
            <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmit}>Submit</button>
            <input value={`score: ${count}`} readOnly className="mt-3 btn btn-info ms-2 count" />
            <h5>{message}</h5>
            <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmitEnd}>LogOut</button>
            </div>
            <h4 className="mt-5 mb-5 ">Subscription</h4>
            <input type="radio" class="btn-check" id="btncheck1" autocomplete="off" name="choose"/>
  <label className="btn btn-outline-info" for="btncheck1">Open one letter</label>
            <input type="radio" class="btn-check" id="btncheck2" autocomplete="off" name="choose"/>
  <label className="btn btn-outline-info" for="btncheck2">Open two letter</label>
        </div>
    );
}

