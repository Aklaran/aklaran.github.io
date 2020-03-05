import React from "react"
import PropTypes from "prop-types"

const PageCard = ({ title, children }) => {
    return (
        <div id="main-card">
            <h1 id="card-heading">{title}</h1>
            <div id="card-content">{children}</div>
        </div>
    )
}

PageCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  }
  
  export default PageCard