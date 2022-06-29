import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/User/login/Login';
import Register from './pages/User/register/Register';
import Landing from './pages/User/landing/Landing';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/admin/home/Home';
import { AdminLogin } from './pages/admin/login/AdminLogin';

import Single from './pages/admin/single/Single';
import New from './pages/admin/new/New';
import List from './pages/admin/list/List';


function App() {
  return (
    <>
      <Router>
        <div className='container'>

          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />

            {/* ====================Admin======================= */}

            <Route path='/admin'>
              <Route index element={<AdminLogin />} />
              <Route path='home' element={<Home/>}/>
              <Route path="users" >
                  <Route index element={<List/>}/>
                  <Route path=':userId' element={<Single/>} />
                  <Route path='new' element={<New/>} />
              </Route>

              <Route path="products" >
                  <Route index element={<List/>}/>
                  <Route path=':productId' element={<Single/>} />
                  <Route path='new' element={<New/>} />
              </Route>
            </Route>


          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>


  );
}

export default App;
