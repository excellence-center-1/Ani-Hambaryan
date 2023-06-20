import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {SignIn} from './myJs/SignIn';
import { Welcome } from './myJs/MyPage';
import { WelcomeSignUp } from './myJs/welcomeSignUp';
import {RegistrationForm} from './myJs/Registration';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with the server's GraphQL endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
