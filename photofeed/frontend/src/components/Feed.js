import React, { Component } from "react";
import Brick from "./Brick"

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',        
        height: '100vh',
        overflowY: 'scroll',
        // border: '1px solid goldenrod'
    },
    masonry: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 200px)',
        gridGap: '10px',
        gridAutoRows: '10px'
    },
    pageProgress: {
        gridColumn: '1 / 4',
        textAlign: 'center',
        padding: '10px'
    }, 
    feedEnd: {
        gridColumn: '1 / 4',
        textAlign: 'center',
        padding: '10px'
    }
}

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

    render() {
        const { data, loaded, placeholder } = this.state;
        if (loaded) {            
            const images = data.images.map(el => 
                <Brick 
                    key={el.id} 
                    url={el.url} 
                    title={el.title}
                    imageHeight={el.height}
                    />)
            return (
                <div                 
                    style={styles.container}
                    onScroll={(event) => this.onScroll(event.target)}>
                    <div style={styles.masonry}>
                        {images}
                        { this.state.loadingNext ? <div style={styles.pageProgress}>Loading...</div> : null }
                        { this.state.feedExhausted ? <div style={styles.feedEnd}>You've reached the end of the feed!</div> : null }
                    </div>                    
                </div>                
            )
        } else {
            return <p>{placeholder}</p>
        }
    }
}

export default Feed;
