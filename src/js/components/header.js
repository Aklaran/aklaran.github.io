import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ atHome }) => (
  <header>
      <Link to="/"><h1>Aklaran</h1></Link>

      <h2 className="header-right" style={{ margin: 0 }}>
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
