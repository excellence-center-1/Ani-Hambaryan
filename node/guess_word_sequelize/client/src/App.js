import './App.css';
import { Register } from './Register';
import { Login } from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GuessWord } from './guessWord';

function App() {
  return (

    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Register />} />
            {/* <Route path='sign-up' element={<WelcomeSignUp />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/game' element={<GuessWord />} /> 
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;