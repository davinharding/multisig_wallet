import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      await getTransfer(wallet, accounts);
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
    };
    init();
  }, []);

  const getTransfer = async (wallet, accounts) => {
    const transfers = await wallet.methods.getTransfers().call();
    await transfers.forEach(async (transfer) => {
      const isTransferApprovedByCurrentUser = await wallet.methods
      .approvals(accounts[0], transfer.id)
      .call();
      let newTransferObj = {
        id: transfer.id,
        amount: transfer.amount,
        to: transfer.to,
        approvals: transfer.approvals,
        sent: transfer.sent,
        isTransferApprovedByCurrentUser: isTransferApprovedByCurrentUser
      };  
      setTransfers(transfers => [...transfers, newTransferObj]) 
    });     
  }; 


  const createTransfer = async transfer => {
    if(transfer && transfer.amount && transfer.to){
      await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({from: accounts[0]}); 
    }else{
      alert('Please fill in all fields before submitting!')
    }
    setTransfers([]);
    getTransfer(wallet, accounts);
  }

  const approveTransfer = async transferId => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({from: accounts[0]});
    
    setTransfers([]);
    getTransfer(wallet, accounts);
  }


  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
  ){
    return (
      <Spinner style={{ textAlign: 'center' }}animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )

  }

  return (
    <Card style={{ width: '60%', margin: 'auto' }}>
      <div className="App" style={{marginLeft: '5rem', marginRight: '5rem'}}>
        <h2>Davin's Multi-Sig Wallet</h2>
        <Header approvers={approvers} quorum={quorum} />
        <NewTransfer createTransfer={createTransfer} />
        <TransferList transfers={transfers} approveTransfer={approveTransfer} />
      </div>
    </Card>
  );
}

export default App;
