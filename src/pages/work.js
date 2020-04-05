import React from "react"
import { Link } from "gatsby"

import Image from "../js/components/image"
import SEO from "../js/components/seo"

import { motion } from "framer-motion"
import { fadeVariant } from "../js/utils/motion-variants"

import UnderConstruction from "../images/svg/under-construction.svg"

const WorkPage = () => (
  <motion.div
  key={"Blog"}
  variants={fadeVariant}
  initial="initial"
  animate="enter"
  exit="initial"
  >
    <SEO title="Home" />
    <UnderConstruction />
  </motion.div>
)

export default WorkPage
