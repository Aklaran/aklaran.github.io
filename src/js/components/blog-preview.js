import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import { COLORS } from "../utils/constants"

const BlogPreview = ({ title, date, path, children }) => {
  return (
    <Link to={path} style={{ "text-decoration": "none" }}>
      <Wrapper>
        <h1>{title}</h1>
        <PreviewBody>{children}</PreviewBody>
        <h5>Read more</h5>
      </Wrapper>
    </Link>
  )
}

BlogPreview.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  children: PropTypes.node,
}

const Wrapper = styled.div`
  max-width: 600px;
  margin-inline: auto;
  margin-block: 100px;
  color: black;

  &:hover > h1 {
    color: ${COLORS.bordeaux};
  }
`

const PreviewBody = styled.p`
  margin-block: 1.25rem;
`

export default BlogPreview
