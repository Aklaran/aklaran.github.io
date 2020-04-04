import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { headerLogoVariant, fadeVariant } from "../utils/motion-variants"

import Logo from "../../images/svg/wolf.svg"

const Header = ({ atHome }) => (
  <header>
    <AnimatePresence>
      {atHome &&
        <motion.h1 
          className="header-left"
          key="header-text"
          variants={fadeVariant}
          initial="initial"
          animate={atHome ? "enter" : "initial"}
          exit="initial"
          >
          Aklaran
        </motion.h1>
      }
      {!atHome &&
        <motion.div 
          className="header-left"
          key="header-logo"
          variants={fadeVariant}
          initial="initial"
          animate={atHome ? "initial" : "enter"}
          exit="initial"
          >
          <Link to="/"><Logo height="45px" width="45px"/></Link>
        </motion.div>
      }
    </AnimatePresence>
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
