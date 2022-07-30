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
import Photographer from './pages/admin/photographer/phtographer';
import Plogin from './pages/photographer/login/Plogin';
import Phome from './pages/photographer/Home/Phome';

// import Pregister from './pages/photographer/register/Pregister';
// import Pmain from './components/photographer/main/Pmain';
import { About } from './components/photographer/about/About';
import Album from './components/photographer/album/Album';
import Review from './components/photographer/review/Review';
import Filter from './pages/User/filter/Filter';
import MultiStepForm from './components/photographer/multiForm/MultiStepForm';
import { useSelector } from 'react-redux';
import SinglePhotographer from './pages/User/single/SinglePhotographer';
import SingleAbout from './components/users/singleAbout/SingleAbout';
import SingleAlbum from './components/users/singleAlbum/SingleAlbum';
import SingleReview from './components/users/singleReview/SingleReview';
import Profile from './pages/User/profile/Profile';
import PhotographerProfile from './pages/photographer/profile/PhotographerProfile';
// import Register2 from './components/photographer/pregister/Register2';

function App() {

  const {photographer} = useSelector((state)=>state.photographerauth)
  const {user} = useSelector((state)=>state.auth)
  
  return (
    <>
      <Router>
        <div className='container'>
          
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/userprofile' element={<Profile/>} />
            <Route exact path='/filter' element={user ?<Filter/> : <Login /> } />
            <Route exact path='/singlePhotographer/:id' element={ user ?<SinglePhotographer/> :<Login />} >
            <Route index element={<SingleAbout/>}/>
                 <Route path='singlealbum' element={<SingleAlbum/>}/>
                 <Route path='singlereview' element={<SingleReview/>}/>
            </Route>

            {/* ====================Admin======================= */}

            <Route path='/admin'>
              <Route index element={<AdminLogin />} />
              <Route path='home' element={<Home/>}/>
              <Route path="users" >
                  <Route index element={<List/>}/>
                  <Route path=':userId' element={<Single/>} />
                  <Route path='new' element={<New/>} />
              </Route>
              <Route path='photographer'>
                <Route index element={<Photographer/>}/>
              </Route>

              <Route path="products" >
                  <Route index element={<List/>}/>
                  <Route path=':productId' element={<Single/>} />
                  <Route path='new' element={<New/>} />
              </Route>
            </Route>

            {/* {==============================Photographer================} */}


            <Route path='/photographer'>
               <Route index element={<Plogin/>} />
               <Route path='register' element={<MultiStepForm/>}/>
               <Route path='photographerprofile' element={<PhotographerProfile/>}/>

               <Route path='home' element={photographer ? <Phome/> : <Plogin/> }>
                 <Route index element={<About/>}/>
                 <Route path='album' element={<Album/>}/>
                 <Route path='review' element={<Review/>}/>
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
