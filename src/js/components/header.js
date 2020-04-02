import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>

      <h2 style={{ margin: 0 }}>
        <Link to="/work">Work</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/blog">Blog</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/codex">Codex</Link>
      </h2>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
