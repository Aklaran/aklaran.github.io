import React from "react"

import SEO from "../js/components/seo"
import Image from "../js/components/image"
import { motion, AnimatePresence } from "framer-motion"

const IndexPage = () => (
  <>
    <SEO title="Home" />
        <motion.div
            id="image-container"
            key={"Home"}
            initial={{opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.5 }}}
            exit={{ opacity: 0}}>
            <Image/>
        </motion.div>
  </>
)

export default IndexPage
