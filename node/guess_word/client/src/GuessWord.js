import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
// import { addUserScores } from './queries.js';
// import { user_id } from "./login";

const wordList = [
    {
        word: "python",
        hint: "programming language"
    },
    {
        word: "github",
        hint: "code hosting platform"
    },
    {
        word: "google",
        hint: "famous search engine"
    },
    {
        word: "mysql",
        hint: "a relational database system"
    },
    {
        word: "email",
        hint: "related to exchanging message"
    },
    {
        word: "html",
        hint: "markup language for the web"
    },
    {
        word: "body",
        hint: "Visible Part of Web page"
    },
    {
        word: "server",
        hint: "computer or system that provides resources or services to other computers"
    },
    {
        word: "javascript",
        hint: "programming language for the web"
    },
    {
        word: "react",
        hint: "JavaScript library for building user interfaces"
    }
];


export const GuessWord = () => {

    const getRandomWord = () => {
        return wordList[Math.floor(Math.random() * wordList.length)];

    }
    const inputs = [];

    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);
    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const navigate = useNavigate();



    const handleInput = (e) => {
        const index = parseInt(e.target.name); //տալիս է զանգվածի սիմվոլին արժեք
        const character = e.target.value;

        setGuess((prevGuess) => {
            const updatedGuess = [...prevGuess]; //հին զանգվաշը կրկնօրինակում է 
            updatedGuess[index] = character;
            return updatedGuess;
        });
    };


    for (let i = 0; i < currentWord.word.length; i++) {
        inputs.push(<input key={i} name={i.toString()} type="text" value={guess[i] || ''} onChange={(e) => handleInput(e)} className='input-field me-2 rounded-2 bg-info bg-opacity-10 border border-info' />);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const guessWord = guess.join('');
        // let level_id = 0;
        if (guessWord === currentWord.word) {
            setMessage('You are guess the word')
            setCount((prevCount) => prevCount + 1);
            setGuess('')
            setCurrentWord(getRandomWord());

            //             const score = count+1;
            //             if(score <=1){
            //                 level_id=1;
            //             } else if(score === 5){
            //                 level_id = 2;
            //             } else if(score === 8){
            //                 level_id = 3;
            //             } 
            // const user_id = user_id
            // // await addUserScores(user_id, level_id, score);
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
            <input value={`score: ${count}`} readOnly className="mt-3 btn btn-info ms-2 qount" />
            <h5>{message}</h5>
            <button className="mt-3 btn btn-info" type="submit" onClick={handleSubmitEnd}>LogOut</button>
        </div>
    );
}