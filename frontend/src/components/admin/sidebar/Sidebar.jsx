import './sidebar.scss'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="top">
        <logo className="logo">Admin</logo>
      </div>
      <hr />
      <div className="center">
        <ul>
          
          <p className="title">Main</p>
          <li>
            <DashboardCustomizeIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <p className="title">Lists</p>
          <li>
            <PersonIcon className='icon'/>
            <span>Users</span>
          </li>
          <li>
            <PhotoCameraFrontIcon className='icon'/>
            <span>Photographer</span>
          </li>
          <li>
            <AccountBalanceWalletIcon className='icon'/>
            <span>Payments</span>
          </li>
          <p className="title">USER</p>
          <li>
            <ManageAccountsIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className='icon'/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar