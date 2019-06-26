import React, {Component} from 'react';
import '../assets/css/profile.scss';
import '../assets/css/influencer.scss';
import GoogleLogin from 'react-google-login';
import {GoogleAuthentication} from '../services/authentication';
import { Row, Col, Progress, Button } from 'reactstrap';
import { postData, getData, updateData } from '../services/fetchAPI';


export default class Influencer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questsList: '',
            userLoggedIn: false,
            userId: null,
            existPoint: null,
            userEmail: null,
            subscribe: false,
            subscriberList: null,
            subscriberListShow: false,
            
            //channel info
            channelName: '',
            channelFollowers: [],
            channelId: ''
        }

        this.questComplete = this.questComplete.bind(this);
        this.onClickSubscribe = this.onClickSubscribe.bind(this);
        this.getChannelInfo = this.getChannelInfo.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.viewSubscribers = this.viewSubscribers.bind(this);
        this.viewSubscribersClose = this.viewSubscribersClose.bind(this);
    }

    getUserInfo() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        getData(`users/id/${userData.userId}`, userData.accessToken)
            .then(json => {
                const subscribeList = json.follow;

                subscribeList.map( (_channelId) => {
                    if (_channelId == this.state.channelId) {
                        this.setState({
                            subscribe:true
                        })
                    }
                })
            })
    }

    getChannelInfo() {
        const { channelUrl } = this.props.match.params;
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('this');
        console.log(channelUrl);

        //get influencer info
        getData(`influencers/channel/url/${channelUrl}`, userData.accessToken)
            .then(json => {
                console.log('get channel url');
                console.log(json);
                this.setState({ 
                    channelName: json.channelName,
                    channelFollowers: json.followers.length,
                    channelId: json._id,
                    channelUrl: channelUrl,
                 });
            })
    }

    viewSubscribers() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        getData(`influencers/channel/id/${this.state.channelId}`, userData.accessToken)
            .then(json => {
                const subscriberList = json.result.followers.map( (_userId) => {
                    return (
                        <div className="subscriber-list-wrapper">
                            <div className="subscriber-list">
                                <h2>Subscribers</h2>
                                <button className="modal-close" onClick={this.viewSubscribersClose}>X</button>
                                <Row>
                                    <p>{_userId}</p>
                                </Row>
                            </div>

                        </div>
                    )
                })
                this.setState({
                    subscriberList: subscriberList,
                    subscriberListShow: true
                })
            })
    }

    viewSubscribersClose() {
        this.setState({ subscriberListShow: false });
    }

    onClickSubscribe(e) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const existFollowers = this.state.channelFollowers;

        if (e.target.textContent == "Subscribe") {
            // post user follow
            postData(`users/follow`, userData.accessToken, {
                channelId: this.state.channelId
            })
            .then(json => {
                this.setState({
                    channelFollowers: existFollowers+1,
                    subscribe: true,
                })
            })
        } else {
            postData(`users/unfollow`, userData.accessToken, {
                channelId: this.state.channelId
            })
            .then(json => {
                this.setState({
                    subscribe: false,
                    channelFollowers: existFollowers-1,
                })
            })
        }

        
    }

    userLogOut() {
        localStorage.clear();
    }

    userRegistration(response) {
        GoogleAuthentication(response);
    }

    questComplete(event) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const questId = event.target.id;

        postData('products/quest/complete', userData.accessToken, {
            questId: questId
        })

        getData(`products/user/id/${userData.userId}`, userData.accessToken)
            .then( json => {
                this.setState({ existPoint: json.result[0].point });
            })

        getData(`products/quest/id/${questId}`, userData.accessToken)
            .then( json => {
                const point = this.state.existPoint + json.result[0].point;

                updateData(`products/user`, userData.accessToken, {
                    userId: userData.userId,
                    point: point
                })
                    .then(json => {
                        console.log(json);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        
        // window.location.reload();
    }

    componentDidMount() {
        this.getChannelInfo();
        this.getUserInfo();
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        //get quests list
        if (userData) {
            getData('products/quest', userData.accessToken)
            .then(json => {
                // let questsList = json.result.map( (_quest) => {
                //     return( 
                //         <li key={_quest._id}>
                //             <div className="wrapper">
                //                 <img src={'icon/001-order.png'} alt=""/>
                //                 <p>{_quest.questName}</p>
                //                 <div className="points">{_quest.point} Points</div>
                //                 <button onClick={this.questComplete} className="btn btn-primary" id={_quest._id}>Quest Complete</button>
                //             </div>
                //         </li>
                //     )
                // })
                // this.setState({
                //     questsList: questsList,
                //     userLoggedIn: true,
                //     userEmail: userData.email
                // })
            })
        }
    
    }

    render() {
        console.log(this.state.channelUrl)

        const welcomeMessage = (
            <p className="message">
                logged in as, {this.state.userEmail}. <a href="" onClick={this.userLogOut}>Log out</a>
            </p>
        )

        return(
            <div>
                {this.state.subscriberListShow? this.state.subscriberList : ""}

                <div className="container-fluid profile">
                    <Row>
                        <Col xs="3" sm="4" md="2" className="p-0">
                            <div className="profile-picture">
                                <img src={'images/pp2.png'}/>
                            </div>
                        </Col>

                        <Col xs="9" sm="8" md="5">
                            <h2>{this.state.channelName}</h2>
                            <p>Level ## [Medal-Granted-Title]</p>
                            <div className="subscribe-list">
                                <Button
                                    color={this.state.subscribe? "secondary" : "danger"}
                                    onClick={this.onClickSubscribe}
                                    >
                                    {this.state.subscribe? "Unsubscribe" : "Subscribe" }
                                </Button>

                                <Button
                                    color="primary"
                                    onClick={this.viewSubscribers}
                                    >
                                    View Subscribers
                                </Button>

                                <p>{this.state.channelFollowers} followers</p>
                            </div>
                        </Col>

                        <Col className="button-auth" xs="12" sm="12" md="5">
                            {this.state.userLoggedIn? welcomeMessage : <p className="message">Link accounts to unlock features and more quest types!</p>}
                            <button className="steam">
                                <img src={'images/steam-icon.png'}/>
                                <p>Steam</p>
                            </button>

                            <button className="twitch">
                                <img src={'images/twitch-icon.png'}/>
                                <p>Twitch</p>
                            </button>
                            
                            <GoogleLogin
                                clientId="539105602259-o3tjmif4f2rnbldd5hve00td1ckjaosm.apps.googleusercontent.com"
                                render = {renderProps => (
                                    <button className="google" onClick={renderProps.onClick}>
                                        <img src={'images/google-icon.png'}/>
                                        <p>Google</p>
                                    </button>
                                )}
                                onSuccess={this.userRegistration}
                                onFailure={this.userRegistration}
                                cookiePolicy={'single_host_origin'}
                            />

                            <button className="facebook">
                                <img src={'images/facebook-icon.png'}/>
                                <p>Facebook</p>
                            </button>
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col className="season-1" md="4">
                            <h3>Season 1 Medals</h3>
                            <Row>
                                <Col xs="4" md="auto">
                                    <img src={'/images/pp.png'} className="col-xs-p-0 logo"/>
                                </Col>

                                <Col xs="8" md="auto">
                                    <h3 className="medals-title">"The Gold Hunter"</h3>
                                    <div className="badge">
                                        {/* {badges} */}
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col className="batch-list" md="8">
                            <h3 class="batch-list-title">Quest</h3>

                            <div className="batch-list-content">
                                {this.state.questsList}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}