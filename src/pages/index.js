import React from "react"
import Seo from "../js/components/seo"
import BlogPreview from "../js/components/blog-preview"
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import styled from "styled-components"

import { fadeVariant } from "../js/utils/motion-variants"

import { COLORS } from "../js/utils/constants"
import { array } from "prop-types"

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
      <SummaryGrid>
        {posts.map(({ node: post }) => (
          <Cell key={post.frontmatter.path}>
            <BlogPreview
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              path={post.frontmatter.path}
              image={post.frontmatter.image}
            >
              {post.frontmatter.blurb}
            </BlogPreview>
          </Cell>
        ))}
      </SummaryGrid>
    </motion.div>
  )
}

Index.propTypes = {}

const Title = styled.h5`
  text-align: center;
  text-transform: lowercase;
  color: ${COLORS.bordeaux};
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman,
    Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
`

const SummaryGrid = styled.div`
  width: min(800px, 90%);
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
  gap: 12px;

  filter: drop-shadow(1px 4px 8px hsl(0deg 0% 0% / 0.2));
`

const Cell = styled.div`
  &:first-of-type {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 9;
  }

  aspect-ratio: 3 / 4;

  will-change: transform;
  transition: transform 600ms, filter 600ms;

  &:hover {
    transform: translateY(-4px);
    filter: drop-shadow(2px 8px 16px hsl(0deg 0% 0% / 0.5));

    transition: transform 300ms, filter 300ms;
  }
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
            image {
              childImageSharp {
                gatsbyImageData(width: 800)
              }
            }
          }
        }
      }
    }
  }
`

export default Index
