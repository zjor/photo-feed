import React, { Component } from "react";
import Brick from "../Brick/Brick"
import "./Feed.css"

class Feed extends Component {
    state = {
        data: [],
        loaded: false,
        loadingNext: false,
        feedExhausted: false,
        placeholder: "Loading..."
    };

    componentDidMount() {
        fetch(this.props.endpoint)
            .then(res => res.json())
            .then(json => this.setState({data: json, loaded: true}))
    }

    onScroll(element) {
        if (element.scrollHeight - element.scrollTop === element.clientHeight && !this.state.loadingNext) {
            const nextUrl = this.state.data.next
            if (nextUrl !== undefined) {
                this.setState({ loadingNext: true })
                fetch(nextUrl)
                    .then(res => res.json())
                    .then(json => {                        
                        this.setState({
                            data: {
                                images: this.state.data.images.concat(json.images),
                                next: json.next
                            },
                            loadingNext: false
                        })
                    })
            } else {
                this.setState({ feedExhausted: true })
            }
        }
    }

    onDelete(id) {
        fetch(`/api/images/${id}/`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status == 200) {
                this.componentDidMount()
            } else {
                console.log(res)
            }
        })
    }

    render() {
        const { data, loaded, placeholder } = this.state;
        if (loaded) {            
            const images = data.images.map(el => 
                <Brick
                    id={el.id}
                    key={el.id} 
                    url={el.url} 
                    title={el.title}
                    imageHeight={el.height}
                    onDelete={id => this.onDelete(id)}
                    />)
            return (
                <div                 
                    className="container"
                    onScroll={(event) => this.onScroll(event.target)}>
                    <div className="masonry">
                        {images}
                        { this.state.loadingNext ? <div className="page-progress">Loading...</div> : null }
                        { this.state.feedExhausted ? <div className="feed-end">You've reached the end of the feed!</div> : null }
                    </div>                    
                </div>                
            )
        } else {
            return (
                <div className="container">
                    <p>{placeholder}</p>
                </div>
            )   
        }
    }
}

export default Feed;
