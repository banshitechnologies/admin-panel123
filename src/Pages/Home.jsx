import React from 'react'
import Table from '../Components/Table'
import '../css/home.css'
function Home() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="homeHeader">
              <h2>Wellcome To Banshi Global Technologies</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card">
              <div className="card-block">
                <h6 className="m-b-20">Active Orders</h6>
                <h2 className="text-right"><i className="fa fa-cart-plus f-left"></i><span>486</span></h2>
               
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
              <div className="card-block">
                <h6 className="m-b-20">Total Spends</h6>
                <h2 className="text-right"><i className="fa fa-rocket f-left"></i><span>486</span></h2>
                
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
              <div className="card-block">
                <h6 className="m-b-20">Total Orders</h6>
                <h2 className="text-right"><i className="fa fa-refresh f-left"></i><span>486</span></h2>
                
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-pink order-card">
              <div className="card-block">
                <h6 className="m-b-20">Payment Status</h6>
                <h2 className="text-right"><i className="fa fa-credit-card f-left changeSize"></i><span className='ml-2'>486</span></h2>
                
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5>Recent Activity</h5>
          </div>
          <div className="col-md-8">
            <Table />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
