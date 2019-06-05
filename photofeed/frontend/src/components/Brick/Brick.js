import React, { Component } from "react";

const styles = {
    title: {
        backgroundColor: 'darkorange',
        padding: '10px'
    }
}

class Brick extends Component {

    render() {
        const { url, title, imageHeight } = this.props

        const rowGap = 10
        const headerHeight = 38
        const rowHeight = 10

        const rowSpan = Math.ceil((headerHeight + imageHeight + rowGap) / (rowHeight + rowGap))
        console.log("row span: " + rowSpan + "; " + imageHeight)
        const style = {
            gridRowEnd: 'span ' + rowSpan
        }
        return (
            <div style={style}>
                <div style={styles.title}>{title}</div>
                <img src={url}></img>
            </div>
        )
    }
}

export default Brick