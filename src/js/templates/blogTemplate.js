import React from "react"
import { graphql } from "gatsby"

import PageCard from "../components/page-card"

export default function BlogTemplate({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <PageCard title={frontmatter.title} date={frontmatter.date}>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
    </PageCard>
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