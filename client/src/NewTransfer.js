import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function NewTransfer({createTransfer}) {
    const [transfer, setTransfer] = useState(undefined);

    const submit = e => {
        e.preventDefault();
        createTransfer(transfer);              
    }

    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({...transfer, [field]: value})              
    }

    return (
        <div>
            <h2>Create Transfer</h2>
            <Form style={{width: '50%'}}>
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="amount">Amount</Form.Label>
                    <Form.Control
                        id="amount"
                        type="text"
                        onChange={e => updateTransfer(e, 'amount')}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="to">To</Form.Label>
                    <Form.Control
                        id="to"
                        type="text"
                        onChange={e => updateTransfer(e, 'to')}
                    />
                </Form.Group>
                <Button variant="primary" onClick={(e) => submit(e)}>Submit</Button>
            </Form>            
        </div>
    )
}

export default NewTransfer;