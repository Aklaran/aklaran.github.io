import React from "react"
import { graphql, Link } from 'gatsby'

import SEO from "../js/components/seo"
import PageCard from "../js/components/page-card"

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <SEO title="Blog" />
      <h1>issa blog</h1>

      <div>
        {posts.map(({ node: post }) => (
          <Link to={post.frontmatter.path} key={post.frontmatter.path}>
            <PageCard title={post.frontmatter.title} date={post.frontmatter.date}>
              {post.excerpt}
            </PageCard>
          </Link>
        ))}
      </div>
    </>
  )
}

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
