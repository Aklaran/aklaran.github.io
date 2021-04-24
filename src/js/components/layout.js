/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

import Header from "./header"
import "../../css/reset.css"
import backgroundImage from "../../images/the_glacier_above.jpg"
import { COLORS } from "../utils/constants"

import { fadeVariant } from "../utils/motion-variants"

const Layout = ({ children, location }) => {
  return (
    <>
      <Header />

      <main>
        <AnimatePresence>{children}</AnimatePresence>
      </main>

      <Background variants={fadeVariant} initial="initial" animate="enter">
        <BackgroundOverlay />
      </Background>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center center;
  background-color: black;
`

const BackgroundOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${COLORS.bgOverlay};
  z-index: -1;
`

export default Layout
