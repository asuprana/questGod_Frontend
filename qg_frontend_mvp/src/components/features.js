import React, {Component} from 'react';
// import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class Features extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            // <div className="container" id="features">
            <section className="row" id="features">
                
                <div className="col-md-6 col-sm-12 qg-about">
                    <h2 className="qg-title">WHAT IS QUESTGOD?</h2>
                    <div className="content">
                        <iframe src="https://player.twitch.tv/?channel=kami421520" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="100%"></iframe>

                        <p>We are a gamer community that issues challenges for gamers across a wide variety of games.</p>
                        <p>Starting out from a discord channel, we have now expanded into providing gamers with a unique opportunity to have fun and at the same time be rewarded for completing milestones within the games they love</p>

                        <button className="discord">
                            <img src={'images/discord-button.png'} alt=""/>
                        </button>

                    </div>
                </div>

                <div className="col-md-6 col-sm-12 qg-features">
                    <h2 className="qg-title">EXCITING FEATURES</h2>
                    <div className="content">
                        <div className="row">
                            <li className="col-md-6 col-sm-6 col-xs-12">
                                <div className="qg-features-wrapper">
                                    <div className="filter"></div>
                                    <img src={'images/list-1.jpg'} className="background" alt=""/>
                                    <h3>TWITCH INTERACTIVE</h3>
                                    <img src="images/twitch-logo.png" alt=""/>
                                </div>
                            </li>

                            <li className="col-md-6 col-sm-6 col-xs-12">
                                <div className="qg-features-wrapper">
                                    <div className="filter"></div>
                                    <img src={'images/list-2.jpg'} className="background" alt=""/>
                                    <h3>COMMUNITY QUESTS</h3>
                                    <img src="images/quest-god-logo.png" alt=""/>
                                </div>
                            </li>
                        </div>

                        <div className="row">
                            <li className="col-md-6 col-sm-6 col-xs-12">
                                <div className="qg-features-wrapper">
                                    <div className="filter"></div>
                                    <img src={'images/list-3.jpg'} className="background" alt=""/>
                                    <h3>EXCLUSIVE GAME REBATES</h3>
                                    <img src={'images/steam-logo.png'} alt=""/>
                                </div>
                            </li>

                            <li className="col-md-6 col-sm-6 col-xs-12">
                                <div className="qg-features-wrapper">
                                    <div className="filter"></div>
                                    <img src={'images/list-4.jpg'} className="background" alt=""/>
                                    <h3>LET'S PLAY AGAINST</h3>
                                    <img src={'images/monster-hunter-logo.png'} alt=""/>
                                </div>
                            </li>
                        </div>
                        <div className="row">
                        
                            <li className="col-md-6 col-sm-6 col-xs-12">
                                <div className="qg-features-wrapper">
                                    <div className="filter"></div>
                                        <img src={'images/list-5.jpg'} className="background" alt=""/>
                                        <h3>LET'S PLAY AGAINST</h3>
                                        <img src="images/nascar-logo.png" alt=""/>
                                </div>
                            </li>

                        
                            <li className="col-md-6 col-sm-6 col-xs-12">
                                <div className="qg-features-wrapper">
                                    <div className="filter"></div>
                                    <img src={'images/list-6.jpg'} className="background" alt=""/>
                                    <h3>MORE</h3>
                                    <img src="images/plus-icon.png" alt=""/>
                                </div>
                            </li>
                        </div>{/*row*/}
                    </div>{/*content */}
                </div>
            </section>
        )
    }
}

export default Features;