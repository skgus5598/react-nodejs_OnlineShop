import './App.css';
import { Routes, Route} from 'react-router-dom'
import Product_details from './components/Product_details.js';
import Main from './components/Main.js';
import Header from './components/Header.js';
import UploadForm from './components/UploadForm.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import MyPage from './components/MyPage.js';
import UploadList from './components/UploadList.js';
import LikedList from './components/LikedList.js';
import MyUploadDetail from './components/MyUploadDetail.js';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/detail" element={<Product_details />} />
        <Route path="/upload" element={<UploadForm/>} />
        <Route path='/uploadList' element={<UploadList />} />
        <Route path='/likedList' element={<LikedList />} />
        <Route path='/myUploadDetail' element={<MyUploadDetail />} />

        
      </Routes>
     

    </div>
  );
}

export default App;
