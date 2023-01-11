import { Container, TextField, Button } from "@mui/material"
import { useState, useEffect } from 'react'
import * as Web3 from '@solana/web3.js'
import styles from './GetBalance.module.css'


export const GetBalance = () => {
  const [formAddress, setFormAddress] = useState('')
  const [balance, setBalance] = useState(0.0);
  const [inputErr, setInputErr] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(true)

  useEffect(() => {
    console.log(formAddress)
  }, [formAddress])

  const addressSubmittedHandler = (address) => {
    try {
      const key = new Web3.PublicKey(formAddress)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
        setFormAddress('')
        setInputErr(false)
      })
    } catch(err) {
      console.error(err)
      setInputErr(true)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (formAddress.length < 44) {
        setButtonDisable(true)
      } else {
        setButtonDisable(false)
      }
    }, 200);
  }, [formAddress])

  const textAriaHandler = (event) => {
    setFormAddress(event.target.value)
  }

  return (
    <Container sx={{marginTop: '200px'}} maxWidth='xl'>
      <div style={{width: '100%', display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>

        {inputErr ?  
          (<TextField 
            error
            value={formAddress}
            onChange={(event) => textAriaHandler(event)}
            sx={{width: '500px'}}
            label="Incorrect address"
            variant="outlined"
            spellCheck="false"
          />
          ) : ( 
          <TextField 
            value={formAddress}
            onChange={(event) => textAriaHandler(event)}
            sx={{width: '500px'}}
            label="Wallet address"
            variant="outlined"
            spellCheck="false"
          />)
        }
        {buttonDisable ? 
          (
            <Button disabled sx={{margin: '10px 10px', width: '150px'}} onClick={() => addressSubmittedHandler()} variant="contained">input address</Button>
          ) : (
            <Button sx={{margin: '10px 10px', width: '150px'}} onClick={() => addressSubmittedHandler()} variant="contained">Get Balance</Button>
          )
        }
        <h1 className={styles.balance}>Your balance: {balance} SOL</h1>
      </div>
    </Container>
  )
}
