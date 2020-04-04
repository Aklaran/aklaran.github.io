import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "../../images/svg/wolf.svg"

const Header = ({ siteTitle }) => (
  <header>
      <div className="header-left">
        <Link to="/"><Logo height="45px" width="45px"/></Link>
      </div>
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
