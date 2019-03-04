import React from 'react';
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";


const Contact = (props) => {
    return (
        <div className="site-section" data-aos="fade">
            <div className="container-fluid">

                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="row mb-5">
                            <div className="col-12 ">
                                <h2 className="site-section-heading text-center">Contact Us</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 mb-5">
                                <ContactForm/>
                            </div>
                            <ContactInformation/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Contact;