import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { NewContact } from './components/NewContact';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/newcontact" element={<NewContact />} />
                </Routes>
            </div>
        </BrowserRouter>

    );
}

export default App;
