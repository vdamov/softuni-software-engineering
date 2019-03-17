import axios from 'axios'
import Blob from 'blob'
import FormData from 'form-data'
import React, {Component} from 'react'
import {Button, Card, CardImg} from "reactstrap";
import Files from "./Files";
import FormText from "reactstrap/es/FormText";
import './Upload.css';

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
        })
    };

    onFilesError = (error) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    };

    filesUpload = () => {
        const formData = new FormData();
        formData.append('userId', this.props.user.userId);
        Object.keys(this.state.files).forEach((key) => {
            const file = this.state.files[key];

            formData.append(key, new Blob([file], {type: file.type}), file.name || 'file')
        });
        if (this.state.files.length > 0) {
            axios.post(`http://localhost:9999/feed/add-meme`, formData)
                .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
                .catch(err => window.alert('Error uploading files :('))

        }
    };

    render() {
        return (
            <div>
                <div className="pb-5 offset-3">
                    <Files
                        ref='files'
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={['.png', '.jpg', '.jpeg', '.gif']}
                        multiple
                        maxFiles={3}
                        maxFileSize={2000000}
                        minFileSize={0}
                        clickable

                    >
                        <p className="drop">Drop images here or click to upload</p>
                    </Files>
                    <div className="mt-2">
                        <FormText>You can upload up to 3 images at once.</FormText>
                        <FormText>Allowed images formats: .jpg, .jpeg, .png, .gif</FormText>
                        <FormText>The maximum allowed images size is 2MB.</FormText>
                    </div>
                    <div className="offset-4">
                        <Button className="drop-button" onClick={this.filesRemoveAll} color="secondary">Remove All
                            Files</Button>
                        <Button className="drop-button" onClick={this.filesUpload} color="secondary">Upload</Button>
                    </div>
                </div>
                {
                    this.state.files.length > 0
                        ? this.state.files.map((file) => (<div className="pb-5" key={file.id}>
                            <Card className="shadow">
                                <CardImg top width="100%"
                                         src={file.preview.url}
                                         alt="Card image cap"/>
                            </Card>
                        </div>))
                        : null
                }
            </div>
        )
    }
}

export default Upload;