import './App.css';
import { Routes, Route} from 'react-router-dom'
import Product_details from './components/Product_details.js';
import Main from './components/Main.js';
import Header from './components/Header.js';
import UploadForm from './components/UploadForm.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import MyPage from './components/mypage/MyPage.js';
import UploadList from './components/mypage/UploadList.js';
import LikedList from './components/mypage/LikedList.js';
import MyUploadDetail from './components/mypage/MyUploadDetail.js';
import Profile from './components/mypage/Profile.js';
import SearchProducts from './components/SearchProducts.js';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/detail" element={<Product_details />} />
        <Route path="/upload" element={<UploadForm/>} />
        <Route path='/uploadList' element={<UploadList />} />
        <Route path='/likedList' element={<LikedList />} />
        <Route path='/myUploadDetail' element={<MyUploadDetail />} />
        <Route path='/searchProducts' element={<SearchProducts />} />


        
      </Routes>
     

    </div>
  );
}

export default App;
