import React, { Component } from "react";
import Image from "./Image"

const styles = {
    div: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
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
            const images = data.images.map(el => <Image key={el.id} url={el.url}/>)
            return <div style={styles.div}>{images}</div>
        } else {
            return <p>{placeholder}</p>
        }
    }
}

export default Feed;
