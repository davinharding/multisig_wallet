import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'

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
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="text"
                    onChange={e => updateTransfer(e, 'amount')}
                />
                <label htmlFor="to">To</label>
                <input
                    id="to"
                    type="text"
                    onChange={e => updateTransfer(e, 'to')}
                />
                <Button variant="primary">Submit</Button>
            </form>            
        </div>
    )
}

export default NewTransfer;