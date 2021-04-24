import React from "react"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

import BlogPreview from "../components/blog-preview"
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
      <BlogPreview title={frontmatter.title} date={frontmatter.date}>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </BlogPreview>
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
