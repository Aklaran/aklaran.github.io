import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import { COLORS } from "../utils/constants"

const BlogPreview = ({ title, date, path, children }) => {
  return (
    <Wrapper>
      <Link to={path} style={{ textDecoration: "none" }}>
        <InnerWrapper>
          <h2>{title}</h2>
          <PreviewBody>{children}</PreviewBody>
          <h5>Read more</h5>
        </InnerWrapper>
      </Link>
    </Wrapper>
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
`

const InnerWrapper = styled.div`
  color: black;

  &:hover > h2 {
    color: ${COLORS.bordeaux};
  }
`

const PreviewBody = styled.p`
  margin-block: 1.25rem;
`

export default BlogPreview
