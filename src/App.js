import 'jquery/dist/jquery.slim'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from './components/NavBar'
import AuthModal from './components/AuthModal'
import Routes from './routes/routes';
import { UserProvider } from './context/UserContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">

        <BrowserRouter basename={'/challengeReactJS'}>
          <UserProvider>
          <DataProvider>

            <Navbar/>
            <AuthModal/>
            <Routes/>
          
          </DataProvider>
          </UserProvider>
        </BrowserRouter>
      <header>
        
      </header>
    </div>
  );
}

export default App;
