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
      <div id="flex-container">
        <motion.div
          variants={fadeVariant}
          initial="initial"
          animate="enter"
          >
          <Header atHome={location.pathname === "/"} />
        </motion.div>

        <main>
          <AnimatePresence>
            {children}
          </AnimatePresence>
        </main>

      </div>

        <motion.div
           id="bg"
           variants={fadeVariant}
           initial="initial"
           animate="enter"
           >
          <div id="bg-overlay"></div>
        </motion.div>
      
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
