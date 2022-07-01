import Chart from '../../../components/admin/chart/Chart'
import Featured from '../../../components/admin/featured/Featured'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Table from '../../../components/admin/table/Table'
import Widget from '../../../components/widget/Widget'
import './home.scss'
const Home = () => {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget type="user"/>
            <Widget  type="Photographer"/>
            <Widget  type="Income"/>
          </div>
          <div className='charts '>
            <Featured/>
            <Chart/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table/>
          </div>
        </div> 
    </div>
  )
}

export default Home