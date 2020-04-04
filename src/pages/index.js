import React from "react"

import SEO from "../js/components/seo"

// Image Imports
import Image from "../js/components/image"
import GithubIcon from "../images/svg/github.svg"
import LinkedInIcon from "../images/svg/linkedin.svg"
import YoutubeIcon from "../images/svg/youtube.svg"

// Animation Imports
import { motion } from "framer-motion"
import { landingContainerVariant, landingItemVariant } from "../js/utils/motion-variants"

const IndexPage = () => (
  <>
    <SEO title="Home" />
        <motion.div
          id="image-container"
          key={"Home"}
          variants={landingContainerVariant}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.div variants={landingItemVariant}>
            <Image/>
          </motion.div>

          <motion.div className="social-icon" variants={landingItemVariant}>
            <a href="https://github.com/Aklaran"><GithubIcon height='45px' width='45px'/></a>
          </motion.div>

          <motion.div className="social-icon" variants={landingItemVariant}>
            <a href="https://www.linkedin.com/in/siri-tembunkiart/"><LinkedInIcon height='45px' width='45px'/></a>
          </motion.div>

          <motion.div className="social-icon" variants={landingItemVariant}>
            <a href="https://www.youtube.com/watch?v=hsJUNatpDNw"><YoutubeIcon height='45px' width='45px'/></a>
          </motion.div>

        </motion.div>
  </>
)

export default IndexPage
