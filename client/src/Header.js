import React from 'react';

function Header({approvers, quorum}) {
    return (
        <header>
            <ul style={{listStle: 'none'}}>
                <li>Approvers: {approvers.join(', ')}</li>
                <li>Quorum: {quorum}</li>
            </ul>
        </header>
    );
}

export default Header;