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
        url: '',
        loading: false,
        done: false
    }

    onSubmit() {

        this.setState({ loading: true })

        const { title, url } = this.state
        const reqBody = {title, url, width: 200, height:300}
        fetch('/api/post/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
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
                    URL
                    <input 
                        style={styles.input}
                        type="url" 
                        value={this.state.url}
                        onChange={(e) => this.setState({url: e.target.value})}/>
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