import './App.css';
import { Routes, Route} from 'react-router-dom'
import Product_details from './components/Product_details.js';
import Main from './components/Main.js';
import Header from './components/Header.js';
import UploadForm from './components/UploadForm.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/detail" element={<Product_details />} />
        <Route path="/upload" element={<UploadForm/>} />
      </Routes>
     

    </div>
  );
}

export default App;
