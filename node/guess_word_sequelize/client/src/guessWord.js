import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
export const GuessWord = () => {


    const inputs = [];

    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);
    const [currentWord, setCurrentWord] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRandomWord = async () => {
            try {
                const response = await fetch('/random-word');
                if (response.ok) {
                    const data = await response.json();
                    setCurrentWord(data);
                } else {
                    console.error('Error retrieving random word', response.status);
                }
            } catch (error) {
                console.error('Error retrieving random word', error);
            }
        };
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


    for (let i = 0; i < currentWord.length; i++) {
        inputs.push(<input key={i} name={i.toString()} type="text" value={guess[i] || ''} onChange={(e) => handleInput(e)} className='input-field me-2 rounded-2 bg-info bg-opacity-10 border border-info inp' />);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const guessWord = guess.join('');
        if (guessWord === currentWord.word) {
            setMessage('You are guess the word')
            setCount((prevCount) => prevCount + 1);
            setGuess('')
           
        } else {
            setMessage('You arn\'t guess the word')
            setCount((prevCount) => prevCount - 1);
            setGuess('')
        }
    };

    const handleSubmitEnd = (e) => {
        e.preventDefault();
        navigate('/login')
    };

    return (
        <div className="container mt-5">
            <h1 className='mt-5 p-5'>================= word guessing game =================</h1>
            <h4>{currentWord.hint}</h4>
            <div className='d-flex justify-content-center container mt-5'>

                {inputs}

            </div>
            <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmit}>Submit</button>
            <input value={`score: ${count}`} readOnly className="mt-3 btn btn-info ms-2 count" />
            <h5>{message}</h5>
            <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmitEnd}>LogOut</button>
        </div>
    );
}