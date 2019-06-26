import React, {Component} from 'react';
import Slider from './slider';
import Features from './features';
import '../assets/css/home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Slider />
                <Features />
            </div>
        )
    }
}

export default Home;