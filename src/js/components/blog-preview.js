import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import format from "date-fns/format"

import { COLORS } from "../utils/constants"

const BlogPreview = ({ title, date, path, children, image }) => {
  const imageData = getImage(image?.childImageSharp?.gatsbyImageData)

  const formattedDate = format(new Date(date), "d MMMM y")

  return (
    <Wrapper>
      <Link to={path} style={{ textDecoration: "none" }}>
        <ImageWrapper>
          <GatsbyImage image={imageData} style={{ position: "revert" }} />
        </ImageWrapper>
        <InnerWrapper>
          <Title>{title}</Title>
          <DateDisplay>{formattedDate}</DateDisplay>
          <PreviewBody>{children}</PreviewBody>
          <More>Read more</More>
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
  height: 100%;
  overflow: hidden;
  position: relative;

  background-color: white;
  border-radius: 12px;

  padding: 0;
`

const ImageWrapper = styled.div`
  opacity: 0.8;

  will-change: opacity;
  transition: opacity 600ms;

  ${Wrapper}:hover & {
    opacity: 1;
  }
`

const InnerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  color: black;
  padding: 16px;
`

const Title = styled.h1`
  color: white;
  filter: drop-shadow(0px 0px 4px hsl(0deg 0% 0% / 1));
`

const DateDisplay = styled.p``

const PreviewBody = styled.p`
  margin-block-start: 1.25rem;
  margin-block-end: 1.25rem;
  line-height: 1.5rem;
`

const More = styled.h5`
  &:hover {
    color: ${COLORS.bordeaux};
  }
`

export default BlogPreview
