//App.js
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Admin, Resource, ListGuesser } from 'react-admin'
//utils
import { dataProvider } from './utils/dataProvider';
import { authProvider } from './utils/authProvider';
import { LoginPage } from './pages/LoginPage';


function App() {
    return (
        <BrowserRouter>
            <Admin
                dataProvider={dataProvider}
                authProvider={authProvider}
                loginPage={LoginPage}
            >
                <Resource name="my-resource" list={ListGuesser} />
            </Admin>
        </BrowserRouter>
    );
}

export default App;
