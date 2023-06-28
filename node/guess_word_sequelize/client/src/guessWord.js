import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
export const GuessWord = () => {


    const inputs = [];

    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [currentquestion, setCurrentQuestion] = useState('')
    const navigate = useNavigate();


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
            setMessage('You are guess the word')
            setCount((prevCount) => prevCount + 1);
            // setGuess('')

        } else {
            setMessage('You arn\'t guess the word')
            setCount((count > 0) ? (prevCount) => prevCount - 1 : count);
            // setGuess('')
        }
        setGuess('');
    await fetchRandomWord(); 
    };

    const handleSubmitEnd = (e) => {
        e.preventDefault();
        navigate('/login')
    };

    return (
        <div className="container mt-5">
            <h1 className='mt-5 p-5'>================= word guessing game =================</h1>
            <h4>{currentquestion}</h4>
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