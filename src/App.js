import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Mint from './pages/mint';

function App() {
  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Mint />
    </div>
  );
}

export default App;
