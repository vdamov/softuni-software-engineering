import {Button, CardFooter} from "reactstrap";
import React from "react";


const Comment = (props) => {

    return (<CardFooter>
        <div className="actionBox">
            {props.comments.length > 0 ? (
                <ul className="commentList">
                    {props.comments.map((comment, commentIndex) => (
                        <li key={commentIndex}>
                            <div className="commenterImage">
                                <img src="/profile.jpg"/>
                            </div>
                            {

                                props.user.username && props.user.isAdmin || props.user.username === comment.author.username
                                    ?
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        props.deleteComment(comment._id, props.memeId, props.memeIndex);
                                    }}>
                                        <img className="float-right mr-3"
                                             src="https://img.icons8.com/ios/16/000000/delete-message.png"/>
                                    </a>
                                    :
                                    null

                            }
                            <div className="commentText">
                                <p className="small">
                                    <span className="text-primary font-weight-bold">{comment.author.username}</span>
                                    &nbsp;{comment.value}

                                </p>
                                <span className=" sub-text"><props.ReactTimeAgo date={new Date(comment.date)}/></span>
                            </div>
                        </li>
                    ))}
                </ul>) : (<p className="small">This meme has no comments yet.</p>)}
            {
                props.user.username
                    ?

                    <form className="form-inline" onSubmit={(e) => {
                        e.preventDefault();
                        props.addComment(e, props.memeId, props.memeIndex);
                        e.target.comment.value = '';
                    }}>
                        <div className="form-group mr-auto">
                            <input className="form-control" type="text" name="comment"
                                   placeholder="Add your comment"/>
                        </div>
                        <div className="form-group">
                            <Button color="secondary" size="sm">Add</Button>
                        </div>
                    </form>
                    :
                    null}
        </div>
    </CardFooter>)
};


export default Comment;