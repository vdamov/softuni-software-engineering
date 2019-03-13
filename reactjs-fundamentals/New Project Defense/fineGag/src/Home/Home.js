import {Button, Card, CardFooter, CardImg, CardTitle, Collapse, Spinner} from "reactstrap";
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
            isOpen: [],
            items: [],
            ratings: [],
            comments: [],
            hasMore: true,
            nextPage: 1,
            hasVoted: {
                up: [],
                down: []
            }
        };
        this.fetchMoreData();
    }


    toggle = (index) => {
        let arr = this.state.isOpen;
        arr[index] = !arr[index];
        this.setState({
            isOpen: arr
        });
    };

    fetchMoreData = () => {
        fetch(`http://localhost:9999/feed/memes?nextPage=${this.state.nextPage}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then((memes) => {

                this.setState({
                    items: this.state.items.concat(memes.memes.docs),
                    isOpen: this.state.isOpen.concat(memes.memes.docs.map(e => false)),
                    ratings: this.state.ratings.concat(memes.memes.docs.map(e => e.vote.rating)),
                    comments: this.state.comments.concat(memes.memes.docs.map(e => e.comments)),
                    hasMore: memes.memes.hasNextPage,
                    nextPage: memes.memes.nextPage,
                    hasVoted: {
                        up: this.state.hasVoted.up.concat(memes.memes.docs.map(e => e.vote.voters.up.some(id => this.props.user.userId === id))),
                        down: this.state.hasVoted.down.concat(memes.memes.docs.map(e => e.vote.voters.down.some(id => this.props.user.userId === id)))
                    }
                });

            })

    };

    addComment = (e, memeId, memeIndex) => {
        if (e.target.comment.value !== '') {
            fetch('http://localhost:9999/feed/add-comment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    value: e.target.comment.value,
                    userId: this.props.user.userId,
                    memeId: memeId
                })
            })
                .then(response => response.json())
                .then(data => {
                    data.comment.author = {username: this.props.user.username};

                    const comments = this.state.comments;
                    comments[memeIndex].push(data.comment);
                    this.setState({comments: comments});

                })

        }
    };


    vote = ({type, memeId, index}) => {
        if (this.props.user.username) {
            fetch('http://localhost:9999/feed/add-vote', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.userId,
                    voteType: type,
                    memeId: memeId
                })
            })
                .then(response => {
                    let arr = this.state.ratings;
                    let hasVoted = this.state.hasVoted;
                    if (type === 'up') {
                        arr[index]++;
                        if (!hasVoted.down[index]) {
                            hasVoted.up[index] = true;
                        }
                        this.setState({ratings: arr, hasVoted: hasVoted});

                    } else {
                        arr[index]--;
                        if (!hasVoted.up[index]) {
                            hasVoted.down[index] = true;
                        }
                        this.setState({ratings: arr, hasVoted: hasVoted})
                    }

                });
        }
    };

    upVoteClass = (index) => this.state.hasVoted.up[index] ? 'up active' : 'up';
    downVoteClass = (index) => this.state.hasVoted.down[index] ? 'down active' : 'down';
    commentClass = (index) => this.state.isOpen[index] ? 'comment active' : 'comment';


    render() {


        console.log(this.state);
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4><Spinner color="dark"/>Loading...</h4>}
                >
                    {this.state.items.map((meme, index) => (
                        <div className="pb-5" key={index}>
                            <Card className="shadow">
                                <CardImg top width="100%"
                                         src={meme.url}
                                         alt="Card image cap"/>
                                <CardTitle className="mb-0">
                                    <ul className="mb-1">
                                        <small className="text-muted">{this.state.ratings[index]} points
                                            · {this.state.items[index].comments.length} comments
                                        </small>
                                    </ul>
                                    <ul className="btn-vote left">
                                        <li><a onClick={(event) => {
                                            event.preventDefault();
                                            if (this.downVoteClass(index) === 'down' && this.upVoteClass(index) === 'up') {
                                                this.vote({type: 'up', memeId: meme._id, index})
                                            }
                                        }} className={this.upVoteClass(index)}><span>UP</span></a>
                                        </li>
                                        <li><a onClick={(event) => {
                                            event.preventDefault();
                                            if (this.downVoteClass(index) === 'down' && this.upVoteClass(index) === 'up') {
                                                this.vote({type: 'down', memeId: meme._id, index})
                                            }
                                        }}
                                               className={this.downVoteClass(index)}><span>DOWN</span></a></li>
                                        <li><a onClick={(e) => {
                                            e.preventDefault();
                                            this.toggle(index);
                                        }}
                                               className={this.commentClass(index)}>
                                            Comment
                                        </a></li>
                                    </ul>
                                    <div className="float-right mr-4">
                                        <small className="text-muted row">Posted by<span
                                            className="text-primary">&nbsp;{meme.author.username}</span></small>
                                        <small className="text-muted row float-right"><ReactTimeAgo
                                            date={new Date(meme.date)}/>
                                        </small>
                                    </div>
                                </CardTitle>

                                <Collapse isOpen={this.state.isOpen[index]}>
                                    <CardFooter>
                                        <div className="actionBox">
                                            <ul className="commentList">
                                                {this.state.comments[index].map((comment, commentIndex) => (
                                                    <li key={commentIndex}>
                                                        <div className="commenterImage">
                                                            <img src="/profile.jpg"/>
                                                        </div>
                                                        <div className="commentText">
                                                            <p className="small">
                                                                <span
                                                                    className="text-primary font-weight-bold">{comment.author.username}</span>
                                                                &nbsp;{comment.value}</p> <span
                                                            className=" sub-text"><ReactTimeAgo
                                                            date={new Date(comment.date)}/></span>

                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            {this.props.user.username ? (
                                                <form className="form-inline" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    this.addComment(e, meme._id, index);
                                                    e.target.comment.value = '';
                                                }}>
                                                    <div className="form-group mr-auto">
                                                        <input className="form-control" type="text" name="comment"
                                                               placeholder="Add your comment"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <Button color="secondary" size="sm">Add</Button>
                                                    </div>
                                                </form>) : null}
                                        </div>
                                    </CardFooter>
                                </Collapse>
                            </Card>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Home;