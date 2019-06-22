import React, { Component } from "react";
import "./style.css"

const styles = {
    title: {
        backgroundColor: 'darkorange',
        padding: '10px'
    }
}

class Brick extends Component {

    render() {
        const { id, url, title, imageHeight, onDelete } = this.props

        const rowGap = 10
        const headerHeight = 38
        const rowHeight = 10

        const rowSpan = Math.ceil((headerHeight + imageHeight + rowGap) / (rowHeight + rowGap))

        const style = {
            gridRowEnd: 'span ' + rowSpan
        }
        return (
            <div style={style} className="brick">
                <div className="title-container">
                    <div className="title">{title}</div>
                    <div className="title-delete" onClick={() => onDelete(id)}>[x]</div>
                </div>
                <img src={url}></img>
            </div>
        )
    }
}

export default Brick