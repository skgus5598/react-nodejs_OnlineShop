import './App.css';
import { Routes, Route} from 'react-router-dom'
import Product_details from './components/Product_details.js';
import Main from './components/Main.js';
import Header from './components/layout/Header.js';
import UploadForm from './components/UploadForm.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import MyPage from './components/mypage/MyPage.js';
import UploadList from './components/mypage/UploadList.js';
import LikedList from './components/mypage/LikedList.js';
import MyUploadDetail from './components/mypage/MyUploadDetail.js';
import Profile from './components/mypage/Profile.js';
import SearchProducts from './components/SearchProducts.js';
import  Footer  from './components/layout/Footer.js';
import PrivateRoute from './components/PrivateRoute.js';
import HeaderTest from './components/HeaderTest.js';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<PrivateRoute />}>
            <Route path='/myPage' element={<MyPage />} />  
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadForm/>} />
            <Route path='/uploadList' element={<UploadList />} />
            <Route path='/likedList' element={<LikedList />} />
            <Route path='/myUploadDetail' element={<MyUploadDetail />} />
        </Route> 

        <Route path="/headertest" element={<HeaderTest />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/detail" element={<Product_details />} />
        <Route path='/searchProducts' element={<SearchProducts />} />

      </Routes>
      <Footer/>
     

    </div>
  );
}

export default App;
