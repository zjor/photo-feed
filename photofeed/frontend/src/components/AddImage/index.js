import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
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
            <div className="add-image-container">
                <h1>Add new image</h1>
                <label className="label">
                    Title
                    <input
                        className="input"
                        type="text" 
                        value={this.state.title} 
                        onChange={(e) => this.setState({title: e.target.value})}/>
                </label>
                <br/>

                <label className="label">
                    Image
                    <input 
                        className="input"
                        type="file" 
                        onChange={(e) => this.onSelectFile(e.target.files[0])}/>
                </label>
                <br/>

                {this.state.previewReady ? <img className="image-preview" src={this.state.imagePreview}/> : null}

                <div className="add-image-toolbar">
                    <Link to="/">
                        Cancel
                    </Link>
                    <button className="btn" onClick={this.onSubmit.bind(this)}>Add</button>
                </div>

                { this.state.loading ? <div className="upload-status">Posting...</div> : null}

                { this.state.error ? <div className="upload-status">{this.state.errorMessage}</div> : null}

            </div>
        )
    }
}

export default AddImage