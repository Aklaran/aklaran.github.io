import React from "react"
import PropTypes from "prop-types"

const PageCard = ({ title, date, children }) => {
    return (
        <div id="main-card">
            <div id="card-heading">
                <h1>{title}</h1>
                <h6>{date}</h6>
            </div>
            <div id="card-content">{children}</div>
        </div>
    )
}

PageCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    children: PropTypes.node
  }
  
  export default PageCard