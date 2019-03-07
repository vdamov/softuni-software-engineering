import React from 'react';

const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <div className="footer py-4 border-top">
            <div className="container-fluid text-center">
                <p>
                    Copyright &copy; {year}
                </p>
            </div>
        </div>
    )
};

export default Footer;