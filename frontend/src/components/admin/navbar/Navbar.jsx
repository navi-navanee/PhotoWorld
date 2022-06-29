import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="wrapper">
           <div className="search">
            <input type="text" placeholder='search' />
            <SearchIcon/>
           </div>
           <div className="items">
            <div className="item">
              <LanguageIcon className='icon'/>
              English
            </div>
            <div className="item">
              <NotificationsActiveIcon className='icon'/>
              <div className="counter">1</div>
            </div>
            <div className="item">
              <DarkModeRoundedIcon className='icon'/>
              Darkmode
            </div>
            <div className="item">
              <LogoutRoundedIcon className='icon'/>
              Logout
            </div>
            <div className="item">
              <img 
              src="https://media-exp2.licdn.com/dms/image/C5603AQHueAg-gqEsZw/profile-displayphoto-shrink_800_800/0/1650633409592?e=1661990400&v=beta&t=Hgr8T7YTaoY6fhVWh79J3v9EjI7EM8Yr8tkrF4hrmzk"
               alt="avatar"
                className="avatar" />
            </div>
           </div>
        </div>
    </div>
  )
}

export default Navbar