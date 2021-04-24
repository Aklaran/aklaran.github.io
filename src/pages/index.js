import React from "react"
import SEO from "../js/components/seo"
import BlogPreview from "../js/components/blog-preview"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"

import { fadeVariant } from "../js/utils/motion-variants"

function Index({ data }) {
  const posts = data.allMarkdownRemark.edges

  return (
    <motion.div
      key={"Blog"}
      variants={fadeVariant}
      initial="initial"
      animate="enter"
      exit="initial"
    >
      <SEO title="Blog" />
      <div>
        {posts.map(({ node: post }) => (
          <BlogPreview
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            path={post.frontmatter.path}
            key={post.frontmatter.path}
          >
            {post.excerpt}
          </BlogPreview>
        ))}
      </div>
    </motion.div>
  )
}

Index.propTypes = {}

export const pageQuery = graphql`
  query BlogsQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
          excerpt
        }
      }
    }
  }
`

export default Index
