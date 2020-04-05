import React, { useState } from "react"

import SEO from "../js/components/seo"

// Image Imports
import Image from "../js/components/image"
import GithubIcon from "../images/svg/github.svg"
import LinkedInIcon from "../images/svg/linkedin.svg"
import YoutubeIcon from "../images/svg/youtube.svg"

// Animation Imports
import { motion } from "framer-motion"
import { landingContainerVariant, landingItemVariant, landingHeaderVariant } from "../js/utils/motion-variants"

function IndexPage() {
  const [nameShown, setNameShown] = useState(false);

  return (
  <>
      <SEO title="Home" />
      <div id="image-container">
          <motion.h1
            className="site-header"
            variants={landingHeaderVariant}
            initial="hidden"
            animate={nameShown? "show" : "hidden"}
          >
            Aklaran
          </motion.h1>
          <motion.div
            key={"Home"}
            variants={landingContainerVariant}
            initial="hidden"
            animate="show"
          >
            <motion.div 
              variants={landingItemVariant}
              onMouseEnter={() => setNameShown(true)}
              onMouseLeave={() => setNameShown(false)}
            >
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
          </div>
    </>
  )
}

export default IndexPage
