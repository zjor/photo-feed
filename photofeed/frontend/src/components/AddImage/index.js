import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap"
import "./style.css"

class AddImage extends Component {

    state = {
        title: '',
        file: '',
        previewReady: false,
        imagePreview: undefined,
        loading: false,
        done: false,
        error: false,
        errorMessage: ''
    }

    onSubmit() {

        this.setState({ loading: true })

        const { title, file } = this.state

        const formData = new FormData()
        formData.append('title', title)
        formData.append('image', file)

        fetch('/api/post/', {
            method: 'POST',            
            body: formData
        }).then(res => {
            if (res.status == 200) {
                this.setState({ done: true })
            } else {
                this.setState({
                    error: true, 
                    loading: false,
                    errorMessage: `${res.status}: Upload failed`
                })
            }
        }).catch(err => {
            this.setState({
                error: true, 
                loading: false,
                errorMessage: err
            })
        })

    }

    onSelectFile(file) {
        this.setState({file: file, previewReady: false})
        const reader = new FileReader()
        reader.onload = (e) => {
            this.setState({
                previewReady: true,
                imagePreview: e.target.result
            })
        }
        reader.readAsDataURL(file)
    }

    render() {
        if (this.state.done) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle><h2>Add image</h2></CardTitle>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    placeholder="Add image title"
                                    value={this.state.title}
                                    onChange={(e) => this.setState({title: e.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="file">File</Label>
                                <Input 
                                    type="file" 
                                    name="file" 
                                    id="file"
                                    onChange={(e) => this.onSelectFile(e.target.files[0])}/>
                            </FormGroup>                            
                        </Form>

                        {this.state.previewReady ? <div><img className="image-preview" src={this.state.imagePreview}/></div> : null}

                        <div style={{verticalAlign: "middle"}}>
                            <Button>
                                <Link to="/" className="add-image-cancel">
                                    Cancel
                                </Link>
                            </Button>{' '}
                            <Button
                                color="primary"
                                onClick={this.onSubmit.bind(this)}>Submit</Button>{' '}
                            { this.state.loading ? <Spinner color="dark"/> : null}                            
                        </div>
                    </CardBody>
                </Card>

                { this.state.error ? <div className="upload-status">{this.state.errorMessage}</div> : null}

            </div>
        )
    }
}

export default AddImage