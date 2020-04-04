/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

import Header from "./header"
import "../../scss/main.scss"

const duration = 0.5

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
}

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div id="flex-container">
        <motion.div
          variants={variants}
          initial="initial"
          animate="enter"
          >
          <Header siteTitle={data.site.siteMetadata.title} />
        </motion.div>

        <main>
          <AnimatePresence>
            {children}
          </AnimatePresence>
        </main>

      </div>

        <motion.div
           id="bg"
           variants={variants}
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
