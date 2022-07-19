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
import { check } from 'prettier';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { getTransactions } from 'apiRequests';
import { contractAddress, mode, nft1, nft2 } from 'config';
import { StateType } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Address } from '@elrondnetwork/erdjs/out';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';



const Transactions = () => {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const { address, account } = useGetAccountInfo();
  const /*transactionSessionId*/[, setTransactionSessionId] = React.useState<
    string | null
  >(null);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [nonce1, setNonce1] = useState();
  const [nonce2, setNonce2] = useState();
  const [test, setTest] = useState<any>();
  const [identifier1, setIdentifier1]=useState();
  const [identifier2, setIdentifier2]=useState();


  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://${mode}api.elrond.com/accounts/${address}/nfts?collection=${nft1}`
        )
        .then(
          async (result) => {
            setItems(result.data);
            console.log('aici-> ', result.data);
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
          `https://${mode}api.elrond.com/accounts/${address}/nfts?collection=${nft2}`
        )
        .then(
          async (result) => {
            setItems2(result.data);
            console.log('aici2->', result.data);
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

  const upgradeTx = async (token_id1: any, nft_nonce1: any, token_id2: any, nft_nonce2: any ) => {
    const pingTransaction = {
      value: '0',
      data:
        'MultiESDTNFTTransfer@' + 
        new Address(contractAddress).hex()+
        '@' + 
        numtoHex(2)+ 
        '@' +
        strtoHex(token_id1) +
        '@' +
        numtoHex(nft_nonce1) +
        '@' +
        numtoHex(1) +
        '@' +
        strtoHex(token_id2) +
        '@' +
        numtoHex(nft_nonce2) +
        '@' +
        numtoHex(1) +
        '@' +
        strtoHex('upgrade'),
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


  function check1(token_id: any, nonce: any) {
    setNonce1(nonce);
    setIdentifier1(token_id);
  }


  
  function check2(token_id: any, nonce: any) {
    setNonce2(nonce);
    setIdentifier2(token_id);
    console.log(token_id);
  }


  return (
    <div >
      <div className='text-center'>
        <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '2px 2px #242526' }}>
          <b>{items.length}</b> Babies <img src='https://tigerspartyclub.com/wp-content/uploads/2022/02/cropped-logo-bun.png' style={{ width: '120px' }} /> <b>{items2.length}</b> Elixirs
        </h2>
        {checked1 != false && checked2 != false &&
          <Button variant="primary" className='button' style={{ width: '200px', backgroundColor: 'black', color: 'white', borderRadius: 15, height: '50px', fontSize: '20px' }} onClick={() => { upgradeTx(identifier1,nonce1,identifier2,nonce2);}} ><b>UPGRADE</b></Button>
        }
      </div>
      <div className='row justify-content-center' >
        <Container>
          <Row>
            <Col>
              <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '2px 2px #242526' }}>
                Baby Tiger</h2>
              {items.map((value: any, index) => (
                <div key={index} className='bs'>
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
                        //id="toggle-check"
                        type="checkbox"
                        variant="secondary"
                        checked={checked1 === value.nonce}
                        value={value.identifier}
                        //onChange={(e) => { setChecked1(value.nonce);}}
                        onClick={() => { setChecked1(value.nonce); check1(value.collection,value.nonce);}}
                        style={{ backgroundColor: 'black', borderRadius: '10px', border: '1px solid' }}

                      >
                        Select Baby Tiger {checked1}
                      </ToggleButton>

                    </ButtonGroup>

                    {/* <input type='radio' value={value.nonce}
              checked={test === value.nonce}
              onChange={() => setTest(value.nonce)} /> */}


                  </div>
                </div>
              ))}
            </Col>
            <Col>
              <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '2px 2px #242526' }}>
                Elixir</h2>

              {items2.map((value2: any, index2) => (
                <div key={index2} className='bs'>
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
                        //id="toggle-check"
                        type="checkbox"
                        variant="secondary"
                        checked={checked2 === value2.nonce}
                        value='1'
                        onClick={() => { setChecked2(value2.nonce); check2(value2.collection,value2.nonce); }}
                        style={{ backgroundColor: 'black', borderRadius: '10px', border: '1px solid' }}
                      >
                        Select Elixir {checked2}
                      </ToggleButton>

                    </ButtonGroup>

                  </div>
                </div>

              ))}
            </Col>
          </Row>
        </Container>
      </div>



    </div >
  );
};


export default Transactions;
