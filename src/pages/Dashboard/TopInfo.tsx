/* eslint-disable prettier/prettier */
import * as React from 'react';
import { contractAddress } from 'config';
import axios from 'axios';



const TopInfo = () => {
  const [artist1,setArtist1] = React.useState<any>();
  const [artist2,setArtist2] = React.useState<any>();
  const [artist3,setArtist3] = React.useState<any>();

  React.useEffect(() => {
    (async () => {
      await axios.post('https://api.elrond.com/query', {
        funcName: 'getArtist1',
        scAddress: contractAddress,
        args: [],
        value: '0',
      })
        .then((response) => {
          const hex = Buffer.from(response.data.returnData[0], 'base64').toString('hex');
          const decimal = parseInt(hex, 16);
          setArtist1(decimal);
        })
        .catch((error) => console.log(error));
    })();
  }, [contractAddress]);

  React.useEffect(() => {
    (async () => {
      await axios.post('https://api.elrond.com/query', {
        funcName: 'getArtist2',
        scAddress: contractAddress,
        args: [],
        value: '0',
      })
        .then((response) => {
          const hex = Buffer.from(response.data.returnData[0], 'base64').toString('hex');
          const decimal = parseInt(hex, 16);
          setArtist2(decimal);
          console.log(decimal);
        })
        .catch((error) => console.log(error));
    })();
  }, [contractAddress]);

  React.useEffect(() => {
    (async () => {
      await axios.post('https://api.elrond.com/query', {
        funcName: 'getArtist3',
        scAddress: contractAddress,
        args: [],
        value: '0',
      })
        .then((response) => {
          const hex = Buffer.from(response.data.returnData[0], 'base64').toString('hex');
          const decimal = parseInt(hex, 16);
          setArtist3(decimal);
        })
        .catch((error) => console.log(error));
    })();
  }, [contractAddress]);

  return (

    <div className='row justify-content-center'>
        <div className='bs col-md-3 m-5'>
          <img src='https://i.imgur.com/JwIGHa2.png' style={{width:'100%'}}></img>
          <div className="container">
              <h3 style={{color: 'white', fontFamily: 'Cinzel'}}>Voturi: {isNaN(parseFloat(artist1)) ? '0' : artist1}</h3>
          </div>
        </div>

        <div className='bs col-md-3 m-5'>
          <img src='https://i.imgur.com/rHoxytF.png' style={{width:'100%'}} />
          <div className="container">
              <h3 style={{color: 'white', fontFamily: 'Cinzel'}}>Voturi: {isNaN(parseFloat(artist2)) ? '0' : artist2}</h3>
          </div>
        </div>

        <div className='bs col-md-3 m-5'>
        <img src='https://i.imgur.com/C1OlVZV.png' style={{width:'100%'}}/>
        <div className="container">
              <h3 style={{color: 'white', fontFamily: 'Cinzel'}}>Voturi: {isNaN(parseFloat(artist3)) ? '0' : artist3 }</h3>
          </div>
        </div> 
        
    </div>
  );

};

export default TopInfo;
