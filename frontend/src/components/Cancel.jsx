import React from 'react';
import { Link } from 'react-router-dom';

function Cancel() {
    return (
        <div>
            <h1>Payment Cancelled</h1>
            <p>You have cancelled the payment process.</p>
            <p>If you wish to continue, please try again.</p>
            <Link to="/appointment">Return to Appointment</Link>
        </div>
    );
}

export default Cancel;