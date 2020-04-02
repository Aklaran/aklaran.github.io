import React from "react"

import SEO from "../js/components/seo"
import Image from "../js/components/image"
import { motion, AnimatePresence } from "framer-motion"

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

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <AnimatePresence>
        <motion.div
            key={"Home"}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit">
            <Image/>
        </motion.div>
    </AnimatePresence>
  </>
)

export default IndexPage
