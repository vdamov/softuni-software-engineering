import React from 'react';

const ContactInformation = (props) => {
    return (
        <div className="col-lg-3 ml-auto">
            <div className="mb-3 bg-white">
                <p className="mb-0 font-weight-bold">Address</p>
                <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

                <p className="mb-0 font-weight-bold">Phone</p>
                <p className="mb-4"><a href="#">+1 232 3235 324</a></p>

                <p className="mb-0 font-weight-bold">Email Address</p>
                <p className="mb-0"><a href="#">youremail@domain.com</a></p>

            </div>

        </div>)
};

export default ContactInformation;