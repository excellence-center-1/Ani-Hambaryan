
//App.js
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
// import { authProvider } from './utils/googleProvider';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import { AppLayout } from './layouts/AppLayout';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import { UserList } from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import { GoogleButton } from './components/GoogleButton';

const DATAPROVIDER = restProvider('http://localhost:3000');
const googleClientId="654868766388-l165egll3330ikvpf734diu2lf54uehc.apps.googleusercontent.com"

// const myGoogleAuthProvider = authProvider(googleClientId);

function App() {
   
    return (
        // <Admin layout={AppLayout} dataProvider={DATAPROVIDER} authProvider={myGoogleAuthProvider} loginPage={GoogleButton}>
        <Admin layout={AppLayout} dataProvider={DATAPROVIDER} >
            <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} icon={ArticleIcon} />
            <Resource name='users' list={UserList} create={UserCreate} edit={UserEdit} icon={PeopleIcon} />
        </Admin>
    );
}

export default App;
