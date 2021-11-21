import React from 'react';
import Badge from 'react-bootstrap/Badge'

function Header({approvers, quorum}) {
    return (
        <header>
            <h4>Approvers</h4>
            <ul style={{listStyle: 'none'}}>
                {approvers.map(approver => {
                    return(
                        
                        <li><Badge bg="info">{approver}</Badge></li>
                        
                    )
                })}
            </ul>
            <h4>Quorum</h4>
            <ul>
            <Badge bg="info">{quorum}</Badge>
            </ul>
        </header>
    );
}

export default Header;