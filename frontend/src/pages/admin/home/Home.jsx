import Chart from '../../../components/admin/chart/Chart'
import Featured from '../../../components/admin/featured/Featured'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Table from '../../../components/admin/paymentTable/Table'
import Widget from '../../../components/widget/Widget'
import './home.scss'
import * as api from '../../../api/Admin';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/spinner/Spinner'
const Home = () => {

  // const dispatch = useDispatch();
  const [Fulldata, setFulldata] = useState({ loading: false, done: false });
  const { admin } = useSelector((state) => state.adminauth);
  
  //create a tocken
  const { token } = admin ? admin : '';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  useEffect(() => {
    !Fulldata.done && getFavoriteDoctors(5);
  }, []);

  const getFavoriteDoctors = async () => {
    setFulldata((prev) => ({ ...prev, loading: true }));
    try {
      const { data } = await api.latestTransactions(config);
      const totalUsers = await api.totalUsers()
      const totalPhotographer = await api.totalPhotographer()
      const totalIncome = await api.totalIncome()
      if (data) {
        setFulldata((prev) => ({
          ...prev,
          transactions: [...data],
          totalUsers: totalUsers,
          totalPhotographer: totalPhotographer,
          totalIncome: totalIncome,
          loading: false,
          done: true,
        }));
      }
    } catch (error) {
      console.log("im error", error);
    }
  };

  if(Fulldata.loading){
    <Spinner/>
  }

  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" Total={Fulldata?.totalUsers} />
          <Widget type="Photographer" Total={Fulldata?.totalPhotographer} />
          <Widget type="Income" Total={Fulldata?.totalIncome} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table transactions={Fulldata.transactions} />
        </div>
      </div>
    </div>
  )
}

export default Home