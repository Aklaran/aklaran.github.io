/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"

import Header from "./header"
import "../../scss/main.scss"

import { fadeVariant } from "../utils/motion-variants"

const Layout = ({ children, location }) => {
  return (
    <>
        {children}

        <motion.div
           id="bg"
           variants={fadeVariant}
           initial="initial"
           animate="enter"
           >
          <div id="bg-overlay"></div>
          <footer>
            <p className="footer">
              © 2020 Bo Tembunkiart.&nbsp;&nbsp;&nbsp;Photography by <a href="https://www.gilbertfoto.com">Andy Gilbert Foto</a>
            </p>
          </footer>
        </motion.div>
      
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
