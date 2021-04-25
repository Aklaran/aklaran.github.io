import React from "react"
import Seo from "../js/components/seo"
import BlogPreview from "../js/components/blog-preview"
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import styled from "styled-components"

import { fadeVariant } from "../js/utils/motion-variants"

import { COLORS } from "../js/utils/constants"

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
      <Seo title="Blog" />
      <Title>A collection of my more coherent thoughts</Title>
      <div>
        {posts.map(({ node: post }) => (
          <BlogPreview
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            path={post.frontmatter.path}
            key={post.frontmatter.path}
          >
            {post.frontmatter.blurb}
          </BlogPreview>
        ))}
      </div>
    </motion.div>
  )
}

Index.propTypes = {}

const Title = styled.h5`
  text-align: center;
  text-transform: lowercase;
  color: ${COLORS.bordeaux};
`

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
            blurb
          }
        }
      }
    }
  }
`

export default Index
