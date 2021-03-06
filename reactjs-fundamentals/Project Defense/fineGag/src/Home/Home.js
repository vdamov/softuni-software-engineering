import {Card, CardImg, CardTitle, Collapse, Spinner} from "reactstrap";
import React, {Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import {toast} from 'react-toastify';


import './Home.css';
import Comment from "./Comment";
import MemeService from "../Services/Meme-Service";
import CommentService from "../Services/Comment-Service";
import VoteService from "../Services/Vote-Service";


JavascriptTimeAgo.addLocale(en);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: [],
            memes: [],
            ratings: [],
            comments: [],
            hasMore: true,
            nextPage: 1,
            votes: {
                up: [],
                down: []
            }
        };
        this.memeService = new MemeService();
        this.commentService = new CommentService();
        this.voteService = new VoteService();
        this.getMemes();
    }


    toggleComments = (index) => {
        let arr = this.state.isOpen;
        arr[index] = !arr[index];
        this.setState({
            isOpen: arr
        });
    };


    getMemes = () => {
        this.memeService.getMemes(this.state.nextPage)
            .then((memes) => {
                console.log(memes);
                this.setState({
                    memes: this.state.memes.concat(memes.memes.docs),
                    isOpen: this.state.isOpen.concat(memes.memes.docs.map(e => false)),
                    ratings: this.state.ratings.concat(memes.memes.docs.map(e => e.vote.rating)),
                    comments: this.state.comments.concat(memes.memes.docs.map(e => e.comments)),
                    hasMore: memes.memes.hasNextPage,
                    nextPage: memes.memes.nextPage,
                    votes: {
                        up: this.state.votes.up.concat(memes.memes.docs.map(e => e.vote.voters.up.some(id => this.props.user.userId === id))),
                        down: this.state.votes.down.concat(memes.memes.docs.map(e => e.vote.voters.down.some(id => this.props.user.userId === id)))
                    }
                });

            })

    };

    deleteMeme = (memeId, memeIndex) => {
        this.memeService.deleteMeme({memeId})
            .then((data) => {
                const memes = this.state.memes;
                const comments = this.state.comments;
                const votes = this.state.votes;
                const ratings = this.state.ratings;
                memes.splice(memeIndex, 1);
                votes.up.splice(memeIndex, 1);
                votes.down.splice(memeIndex, 1);
                comments.splice(memeIndex, 1);
                ratings.splice(memeIndex, 1);
                this.setState({memes, votes, comments, ratings});
                toast(data.message)
            })
    };


    addComment = (e, memeId, memeIndex) => {
        if (e.target.comment.value !== '') {
            this.commentService.addComment({
                value: e.target.comment.value,
                userId: this.props.user.userId,
                memeId: memeId
            })
                .then(data => {
                    data.comment.author = {username: this.props.user.username};

                    const comments = this.state.comments;
                    comments[memeIndex].push(data.comment);
                    this.setState({comments: comments});
                })

        }
    };

    deleteComment = (commentId, memeId, memeIndex) => {
        this.commentService.deleteComment({
            commentId,
            memeId
        })
            .then(() => {
                let comment = this.state.comments[memeIndex].find((c) => c._id === commentId);
                let comments = this.state.comments;
                comments[memeIndex].splice(comments[memeIndex].indexOf(comment), 1);
                this.setState({comments: comments});
            })
    };


    vote = ({type, memeId, index}) => {
        if (this.props.user.username) {
            this.voteService.addVote({
                userId: this.props.user.userId,
                voteType: type,
                memeId: memeId
            })
                .then(() => {
                    let arr = this.state.ratings;
                    let hasVoted = this.state.votes;
                    if (type === 'up') {
                        arr[index]++;
                        if (!hasVoted.down[index]) {
                            hasVoted.up[index] = true;
                        }
                        this.setState({ratings: arr, votes: hasVoted});

                    } else {
                        arr[index]--;
                        if (!hasVoted.up[index]) {
                            hasVoted.down[index] = true;
                        }
                        this.setState({ratings: arr, votes: hasVoted})
                    }
                });
        } else {
            toast.warn('You must be logged in to vote.')
        }
    };

    upVoteClass = (index) => this.state.votes.up[index] ? 'up active' : 'up';
    downVoteClass = (index) => this.state.votes.down[index] ? 'down active' : 'down';
    commentClass = (index) => this.state.isOpen[index] ? 'comment active' : 'comment';


    render() {

        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.memes.length}
                    next={this.getMemes}
                    hasMore={this.state.hasMore}
                    loader={<h4><Spinner color="dark"/>Loading...</h4>}
                >
                    {this.state.memes.map((meme, index) => (
                        <div className="pb-5" key={index}>
                            <Card className="shadow">
                                <CardImg top width="100%"
                                         src={meme.url}
                                         alt="fineGAG meme"/>
                                {
                                    this.props.user.username && this.props.user.username === meme.author.username || this.props.user.isAdmin
                                        ?
                                        (<span className="closebtn" onClick={(e) => {
                                            e.preventDefault();
                                            this.deleteMeme(meme._id, index)
                                        }}>&times;</span>)
                                        :
                                        null
                                }
                                <CardTitle className="mb-0">
                                    <ul className="mb-2 mt-1">

                                        <small className="text-muted">{this.state.ratings[index]} points
                                            · {this.state.memes[index].comments.length} comments
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
                                            this.toggleComments(index);
                                        }}
                                               className={this.commentClass(index)}>
                                            Comment
                                        </a></li>
                                    </ul>

                                    <div className="float-right mr-4">

                                        <small className="text-muted row">Posted by<span
                                            className="text-primary">&nbsp;{meme.author.username}</span></small>

                                        <small className="text-muted row float-right">
                                            <ReactTimeAgo date={new Date(meme.date)}/>
                                        </small>
                                    </div>
                                </CardTitle>

                                <Collapse isOpen={this.state.isOpen[index]}>
                                    <Comment
                                        comments={this.state.comments[index]}
                                        addComment={this.addComment}
                                        memeId={meme._id}
                                        memeIndex={index}
                                        user={this.props.user}
                                        deleteComment={this.deleteComment}
                                        ReactTimeAgo={ReactTimeAgo}/>
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
