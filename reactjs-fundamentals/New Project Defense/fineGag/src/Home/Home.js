import {Card, CardFooter, CardImg, CardTitle, Spinner} from "reactstrap";
import React, {Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import './Home.css';

JavascriptTimeAgo.addLocale(en);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hasMore: true,
            nextPage: 1
        };
        this.fetchMoreData();
    }


    fetchMoreData = () => {
        fetch(`http://localhost:9999/feed/memes?nextPage=${this.state.nextPage}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then((memes) => {
                console.log(memes);

                this.setState({
                    items: this.state.items.concat(memes.memes.docs),
                    hasMore: memes.memes.hasNextPage,
                    nextPage: memes.memes.nextPage
                });

            })

    };


    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4><Spinner color="dark"/>Loading...</h4>}
                >
                    {this.state.items.map((e, index) => (
                        <div className="pb-5" key={index}>
                            <Card className="shadow">
                                <CardImg top width="100%"
                                         src={e.url}
                                         alt="Card image cap"/>
                                <CardTitle className="mb-0">
                                    <ul className="mb-1">
                                        <small className="text-muted">466 points · 39 comments</small>
                                    </ul>
                                    <ul className="btn-vote left">
                                        <li><a href="#" className="up "><span>UP</span></a>
                                        </li>
                                        <li><a href="#"
                                               className="down "><span>DOWN</span></a></li>
                                        <li><a target="_blank" href="#"
                                               className="comment active">
                                            Comment
                                        </a></li>
                                    </ul>
                                    <div className="float-right mr-4">
                                        <small className="text-muted row">Posted by<span
                                            className="text-primary">&nbsp;Uncensored</span></small>
                                        <small className="text-muted row float-right"><ReactTimeAgo
                                            date={new Date(e.date)}/>
                                        </small>
                                    </div>
                                </CardTitle>


                                <CardFooter>

                                    <div className="actionBox">
                                        <ul className="commentList">
                                            <li>
                                                <div className="commenterImage">
                                                    <img src="http://placekitten.com/50/50"/>
                                                </div>
                                                <div className="commentText">
                                                    <p className="">Hello this is a test comment.</p> <span
                                                    className="date sub-text">on March 5th, 2014</span>

                                                </div>
                                            </li>
                                            <li>
                                                <div className="commenterImage">
                                                    <img src="http://placekitten.com/45/45"/>
                                                </div>
                                                <div className="commentText">
                                                    <p className="">Hello this is a test comment and this comment is
                                                        particularly very long and it goes on and on and on.</p>
                                                    <span className="date sub-text">on March 5th, 2014</span>

                                                </div>
                                            </li>
                                            <li>
                                                <div className="commenterImage">
                                                    <img src="http://placekitten.com/40/40"/>
                                                </div>
                                                <div className="commentText">
                                                    <p className="">Hello this is a test comment.</p> <span
                                                    className="date sub-text">on March 5th, 2014</span>

                                                </div>
                                            </li>
                                        </ul>
                                        <form className="form-inline" role="form">
                                            <div className="form-group">
                                                <input className="form-control" type="text"
                                                       placeholder="Your comments"/>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-default">Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Home;