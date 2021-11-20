import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function TransferList({transfers, approveTransfer}){
    return(
        <div>
            <h2>Transfers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Approvals</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map(transfer => (
                        <tr key={transfer.id}>
                            <td>{transfer.id}</td>
                            <td>{transfer.amount}</td>
                            <td>{transfer.to}</td>
                            <td>
                                {transfer.approvals}
                                {transfer.isTransferApprovedByCurrentUser ? (
                                    <Button variant="secondary" disabled>
                                        Approve
                                    </Button> 
                                ) : (
                                    <Button onClick={() => approveTransfer(transfer.id)} variant="success">
                                        Approve
                                    </Button>
                                )}
                            </td>
                            <td>{transfer.sent ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TransferList;