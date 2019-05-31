import React, { Component } from "react";
import Brick from "./Brick"

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    masonry: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 200px)',
        gridGap: '10px',
        gridAutoRows: '10px'
    }
}

class Feed extends Component {
    state = {
        data: [],
        loaded: false,
        placeholder: "Loading..."
    };

    componentDidMount() {
        fetch(this.props.endpoint).then(res => {
            return res.json()
        }).then(json => this.setState({data: json, loaded: true}))
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
                <div style={styles.container}>
                    <div style={styles.masonry}>
                        {images}
                    </div>
                </div>                
            )
        } else {
            return <p>{placeholder}</p>
        }
    }
}

export default Feed;
