import React, {Component} from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const swiper = document.createElement('script');
        // const main = document.createElement('script');
        // const aos = document.createElement('script');
        // const magnific = document.createElement('script');
        // const countdown = document.createElement('script');
        // const stellar = document.createElement('script');
        // const owl = document.createElement('script');
        // const migrate = document.createElement('script');
        // const jquery = document.createElement('script');
        // const ui = document.createElement('script');
        // const popper = document.createElement('script');
        // const bootstrap = document.createElement('script');
        // const datepicker = document.createElement('script');
        // const picturefill = document.createElement('script');
        // const lightgallery = document.createElement('script');
        // const mousewheel = document.createElement('script');
        //
        // mousewheel.src = "js/jquery.mousewheel.min.js";
        // mousewheel.async = true;
        //
        // lightgallery.src = "js/lightgallery-all.min.js";
        // lightgallery.async = true;
        //
        // picturefill.src = "js/picturefill.min.js";
        // picturefill.async = true;
        //
        // datepicker.src = "js/bootstrap-datepicker.min.js";
        // datepicker.async = true;
        //
        // bootstrap.src = "js/bootstrap.min.js";
        // bootstrap.async = true;
        //
        // popper.src = "js/popper.min.js";
        // popper.async = true;
        //
        // ui.src = "js/jquery-ui.js";
        // ui.async = true;
        //
        // jquery.src = "js/jquery-3.3.1.min.js";
        // jquery.async = true;
        //
        // migrate.src = "js/jquery-migrate-3.0.1.min.js";
        // migrate.async = true;
        //
        // owl.src = "js/owl.carousel.min.js";
        // owl.async = true;
        //
        //
        // stellar.src = "js/jquery.stellar.min.js";
        // stellar.async = true;
        //
        // countdown.src = "js/jquery.countdown.min.js";
        // countdown.async = true;
        //
        // magnific.src = "js/jquery.magnific-popup.min.js";
        // magnific.async = true;
        //
        // aos.src = "js/aos.js";
        // aos.async = true;
        //
        // main.src = "js/main.js";
        // main.async = true;
        //
        // swiper.src = "js/swiper.min.js";
        // swiper.async = true;
        //
        // document.body.appendChild(jquery);
        // document.body.appendChild(migrate);
        // document.body.appendChild(ui);
        // document.body.appendChild(popper);
        // document.body.appendChild(bootstrap);
        // document.body.appendChild(owl);
        // document.body.appendChild(stellar);
        // document.body.appendChild(countdown);
        // document.body.appendChild(magnific);
        // document.body.appendChild(datepicker);
        // document.body.appendChild(swiper);
        // document.body.appendChild(aos);
        // document.body.appendChild(picturefill);
        // document.body.appendChild(lightgallery);
        // document.body.appendChild(mousewheel);
        // document.body.appendChild(main);
    }

    render() {
        return (
            <div className="container-fluid" data-aos="fade" data-aos-delay="500">
                <div className="swiper-container images-carousel">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">Nature</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_1.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">Portrait</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_2.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">People</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_3.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">Architecture</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_4.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">Animals</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_5.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">Sports</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_6.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="image-wrap">
                                <div className="image-info">
                                    <h2 className="mb-3">Travel</h2>
                                    <a href="/#" className="btn btn-outline-white py-2 px-4">More
                                        Photos</a>
                                </div>
                                <img src="images/img_7.jpg" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="swiper-pagination"/>
                    <div className="swiper-button-prev"/>
                    <div className="swiper-button-next"/>
                    <div className="swiper-scrollbar"/>
                </div>
            </div>);
    }
}

export default Home;
