import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp';
import Login from './Pages/Login'
import ActivationAccount from './Pages/ActivationAccount';
import ResetPassActivation from './Pages/ResetPassActivation';
import { useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { userAction } from './redux/actions/userAction';
import ForgetPass from './Pages/ForgetPass';
import Home from './Pages/Home';

function App() {
  const {isAuthenticatd} = useSelector((state)=>state.userRed)
  const dispatch = useDispatch(userAction())

  // useEffect(()=>{
  //   const data = dispatch(userAction())
  // },[dispatch])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route
              path="/activation/:activation_token"
              element={<ActivationAccount />}
            ></Route>
             <Route
              path="/resetactivation/:resetactivation_token"
              element={<ResetPassActivation />}
            ></Route>

<Route
              path="/forget-pass"
              element={<ForgetPass />}
            ></Route>

<Route path='/' element={<Home/>}></Route>
        </Routes>
        
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
          />
      </Router>
    </div>
  );
}

export default App;
