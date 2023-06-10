
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './myJs/SignIn';
import { Welcome } from './myJs/MyPage';
import { WelcomeSignUp } from './myJs/welcomeSignUp';
import RegistrationForm from './myJs/Registration';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<RegistrationForm />} />
          <Route path='sign-up' element={<WelcomeSignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='my-page' element={<Welcome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
