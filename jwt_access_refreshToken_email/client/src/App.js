//client/app.js
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite'
import UserService from './services/UserService';


function App() {
    const { store } = useContext(Context)
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!store.isAuth) {
        return (
           
             <div>
                 <LoginForm />
                <button onClick={getUsers}>Get Users</button>
            </div>
        )
    }
    return (
        <div>
    <h1>{store.isAuth ? `User Authenticated: ${store.user.email}` : 'PLEASE LOG IN'}</h1>
    <h1>{store.user.isActivated ? 'Account Confirmed via Email' : 'PLEASE CONFIRM YOUR ACCOUNT!!!!'}</h1>
    <button onClick={() => store.logout()}>Logout</button>
    <div>
        <button onClick={getUsers}>Get Users</button>
    </div>
    {users.map(user => (
        <div key={user.email}>{user.email}</div>
    ))}
</div>

    );
}

export default observer(App);
