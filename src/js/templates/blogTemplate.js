import React from "react"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

import Blog from "../components/blog-full"
import { fadeVariant } from "../utils/motion-variants"

export default function BlogTemplate({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <motion.div
      key={"Blog"}
      variants={fadeVariant}
      initial="initial"
      animate="enter"
      exit="initial"
    >
      <Blog
        title={frontmatter.title}
        path={frontmatter.path}
        date={frontmatter.date}
        content={html}
      ></Blog>
    </motion.div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
