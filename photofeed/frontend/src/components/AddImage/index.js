import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
// import "./style.css"

const styles = {
    label: {
        margin: '8px',
        display: 'inline-block'
    },
    input: {
        marginLeft: '8px'
    }
}

class AddImage extends Component {

    state = {
        title: '',
        file: '',
        loading: false,
        done: false
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
            }
        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        if (this.state.done) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div>
                <h1>Add new image</h1>
                <label style={styles.label}>
                    Title
                    <input
                        style={styles.input}
                        type="text" 
                        value={this.state.title} 
                        onChange={(e) => this.setState({title: e.target.value})}/>
                </label>
                <br/>

                <label style={styles.label}>
                    Image
                    <input 
                        style={styles.input}
                        type="file" 
                        onChange={(e) => this.setState({file: e.target.files[0]})}/>
                </label>
                <br/>

                <Link to="/">
                    Cancel
                </Link>
                <button onClick={this.onSubmit.bind(this)}>Add</button>

                { this.state.loading ? <div>Posting...</div> : null}

            </div>
        )
    }
}

export default AddImage