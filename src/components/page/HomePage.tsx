const HomePage = () => {
    return (
        // section-active로 표출 여부 결정됨
        <section data-id="home" className="animated-section start-page section-active">
            <div className="section-content vcentered">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="title-block">
                            <h2>An Suhyun</h2>
                            <div className="owl-carousel text-rotation">
                                <div className="item">
                                    <div className="sp-subtitle">Web Designer</div>
                                </div>
                                <div className="item">
                                    <div className="sp-subtitle">Frontend-developer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default HomePage;