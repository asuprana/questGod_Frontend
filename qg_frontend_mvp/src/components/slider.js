import React, {Component} from 'react';

class Slider extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(){
        return(
            <section className="row" id="slider">
                <div className="slider-inner">
                    <div className="item">
                        <div className="content">
                            <img src={'images/slider-1.png'} />
                        </div>
                    </div>

                    <div className="item">
                        <div className="content">
                            <img src={'images/slider-2.png'} />
                        </div>
                    </div>

                    <div className="item">
                        <div className="content">
                            <img src={'images/slider-3.png'} />
                        </div>
                    </div>
                </div>
            </section>

            
        );
    }
}

export default Slider;