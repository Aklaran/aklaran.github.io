import React from "react"

import SEO from "../js/components/seo"
import Image from "../js/components/image"
import { motion, AnimatePresence } from "framer-motion"

import GithubIcon from "../images/svg/github.svg"
import LinkedInIcon from "../images/svg/linkedin.svg"
import YoutubeIcon from "../images/svg/youtube.svg"


const outerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 2,
      delayChildren: 1,
      staggerChildren: 0.4
    }
  }
}

const item = {
  hidden: { 
    opacity: 0, 
    y: -30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1
    }
  }
}

const IndexPage = () => (
  <>
    <SEO title="Home" />
        <motion.div
          id="image-container"
          key={"Home"}
          variants={outerContainer}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.div variants={item}>
            <Image/>
          </motion.div>

          <motion.div className="social-icon" variants={item}>
            <a href="https://github.com/Aklaran"><GithubIcon height='45px' width='45px'/></a>
          </motion.div>

          <motion.div className="social-icon" variants={item}>
            <a href="https://www.linkedin.com/in/siri-tembunkiart/"><LinkedInIcon height='45px' width='45px'/></a>
          </motion.div>

          <motion.div className="social-icon" variants={item}>
            <a href="https://www.youtube.com/watch?v=hsJUNatpDNw"><YoutubeIcon height='45px' width='45px'/></a>
          </motion.div>

        </motion.div>
  </>
)

export default IndexPage
