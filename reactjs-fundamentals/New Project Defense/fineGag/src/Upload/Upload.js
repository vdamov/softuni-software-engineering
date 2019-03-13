import axios from 'axios'
import Blob from 'blob'
import FormData from 'form-data'
import React, {Component} from 'react'
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import Files from "./Files";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    onFilesChange = (files) => {
        this.setState({
            files
        }, () => {
            console.log(this.state.files)
        })
    };

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    };

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    };

    filesUpload = () => {
        const formData = new FormData();
        Object.keys(this.state.files).forEach((key) => {
            const file = this.state.files[key];
            formData.append(key, new Blob([file], {type: file.type}), file.name || 'file')

        });
        formData.append('author', this.props.user.username);
        axios.post(`http://localhost:9999/feed/add-meme`, formData)
            .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
            .catch(err => window.alert('Error uploading files :('))
    };

    render() {
        return (
            <div>
                <div className="offset-4 pb-5">
                    <h1>Example 1 - List</h1>
                    <Files
                        ref='files'
                        style={{height: '100px'}}
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={['.png', '.jpg', '.jpeg', '.gif']}
                        multiple
                        maxFiles={10}
                        maxFileSize={10000000}
                        minFileSize={0}
                        clickable

                    >
                        Drop files here or click to upload
                    </Files>
                    <button onClick={this.filesRemoveAll}>Remove All Files</button>
                    <button onClick={this.filesUpload}>Upload</button>
                </div>
                {
                    this.state.files.length > 0
                        ? this.state.files.map((file) => (<div className="pb-5" key={file.id}>
                            <Card className="shadow">
                                <CardImg top width="100%"
                                         src={file.preview.url}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to
                                        additional
                                        content. This content is a little bit longer.</CardText>
                                    <CardText>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>))
                        : null
                }
            </div>
        )
    }
}

export default Upload;