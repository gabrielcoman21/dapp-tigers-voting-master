/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  DappUI,
  transactionServices,
  refreshAccount,
  useGetNetworkConfig,
  getIsLoggedIn,
  setNonce
} from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { getTransactions } from 'apiRequests';
import { contractAddress } from 'config';
import { StateType } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Address } from '@elrondnetwork/erdjs/out';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { check } from 'prettier';



const Transactions = () => {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const { address, account } = useGetAccountInfo();
  const /*transactionSessionId*/[, setTransactionSessionId] = React.useState<
    string | null
  >(null);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [nonce1,setNonce1] = useState();
  const [nonce2,setNonce2] = useState();

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://api.elrond.com/accounts/${address}/nfts?collection=TPCM-396506`
        )
        .then(
          async (result) => {
            setItems(result.data);
            console.log(result.data);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((err) => {
          console.log(err.message);
        });
    })();
  }, [address]);


  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://api.elrond.com/accounts/${address}/nfts?collection=TPCB-8ed04a`
        )
        .then(
          async (result) => {
            setItems2(result.data);
            console.log(result.data);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((err) => {
          console.log(err.message);
        });
    })();
  }, [address]);







  const { sendTransactions } = transactionServices;

  const sendVoteRuby = async (token_id: any, nft_nonce: any) => {
    const pingTransaction = {
      value: '0',
      data:
        'ESDTNFTTransfer@' +
        strtoHex(token_id) +
        '@' +
        numtoHex(nft_nonce) +
        '@' +
        numtoHex(1) +
        '@' +
        new Address(contractAddress).hex() +
        '@' +
        strtoHex('vote') +
        '@01',
      receiver: address,
      gasLimit: '30000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendVoteVelea = async (token_id: any, nft_nonce: any) => {
    const pingTransaction = {
      value: '0',
      data:
        'ESDTNFTTransfer@' +
        strtoHex(token_id) +
        '@' +
        numtoHex(nft_nonce) +
        '@' +
        numtoHex(1) +
        '@' +
        new Address(contractAddress).hex() +
        '@' +
        strtoHex('vote') +
        '@02',
      receiver: address,
      gasLimit: '30000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendVoteMarko = async (token_id: any, nft_nonce: any) => {
    const pingTransaction = {
      value: '0',
      data:
        'ESDTNFTTransfer@' +
        strtoHex(token_id) +
        '@' +
        numtoHex(nft_nonce) +
        '@' +
        numtoHex(1) +
        '@' +
        new Address(contractAddress).hex() +
        '@' +
        strtoHex('vote') +
        '@03',
      receiver: address,
      gasLimit: '30000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };
  function strtoHex(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  function numtoHex(num: number) {
    let result = num.toString(16);
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }


  function check1(value: any){
    setNonce1(value);
    console.log(nonce1);
  }


  function check2(value: any){
    setNonce2(value);
    console.log(nonce2);
  }

  
  return (
    <div >
      <div className='text-center'>
        <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '2px 2px #242526' }}>
          <b>{items.length}</b> NFTs <img src='https://tigerspartyclub.com/wp-content/uploads/2022/02/cropped-logo-bun.png' style={{ width: '120px' }} /> <b>{items.length}</b> votes.
        </h2>
      </div>
      <div className='row justify-content-center' >

        {items.map((value: any, index) => (
          <div key={index} style={{ margin: '25px', backgroundColor: '#242526' }} className='bs'>
            <img
              src={value.url}
              alt='nft'
              style={{
                height: '200px',
                width: '200px',
                margin: '0px',
                borderRadius: 10,
                border: '3px black solid'
              }}
            />

            <div className='text-center' style={{ color: 'white' }}><b>{value.identifier}</b></div>

            <div className='text-center'>
              <ButtonGroup>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="secondary"
                  checked={checked1}
                  value={value.identifier}
                  onChange={(e) => {setChecked1(e.currentTarget.checked); check1(value.nonce);}}        
                >
                 Select Baby Tiger
                </ToggleButton>
             
              </ButtonGroup>
              
            </div>


          </div>
        ))}


        {items2.map((value2: any, index2) => (
          <div key={index2} style={{ margin: '25px', backgroundColor: '#242526' }} className='bs'>
            <img
              src={value2.url}
              alt='nft'
              style={{
                height: '200px',
                width: '200px',
                margin: '0px',
                borderRadius: 10,
                border: '3px black solid'
              }}
            />

            <div className='text-center' style={{ color: 'white' }}><b>{value2.identifier}</b></div>

            <div className='text-center'>
              <ButtonGroup>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="secondary"
                  checked={checked2}
                  value='1'
                  onChange={(e) => {setChecked2(e.currentTarget.checked); check2(value2.nonce);}}
                >
                 Select Elixir
                </ToggleButton>
             
              </ButtonGroup>
              
            </div>
          </div>

        ))}

      </div>



    </div>
  );
};


export default Transactions;
