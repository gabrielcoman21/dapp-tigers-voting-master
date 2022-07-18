/* eslint-disable prettier/prettier */
import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  return (
    <div className=''>
      
      <div className='row' >
        <div className='col-12 col-md-10 mx-auto' >
          <div className='card shadow-sm rounded border-0' style={{backgroundColor: '#242526' }}>
            <div className='card-body p-1 background-img' style={{ borderRadius: 10, border: '3px black solid' }}>
              {/* <img src='https://i.imgur.com/FESGI4X.jpg' style={{width: '100%'}}/> */}
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  {/* <Actions /> */}
                </div>
              </div>
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
