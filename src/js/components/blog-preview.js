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
        <GradientOverlay />
        <FlexWrapper>
          <Title>{title}</Title>
          <DateDisplay>{formattedDate}</DateDisplay>
        </FlexWrapper>
        <InnerWrapper>
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
  color: white;
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

const GradientOverlay = styled.div`
  width: 100%;
  height: 50%;
  background-image: linear-gradient(
    to bottom,
    hsla(0, 0%, 0%, 0) 0%,
    hsla(0, 0%, 0%, 0.004) 7.8%,
    hsla(0, 0%, 0%, 0.017) 14.5%,
    hsla(0, 0%, 0%, 0.038) 20.3%,
    hsla(0, 0%, 0%, 0.067) 25.4%,
    hsla(0, 0%, 0%, 0.106) 30.1%,
    hsla(0, 0%, 0%, 0.153) 34.6%,
    hsla(0, 0%, 0%, 0.21) 39.1%,
    hsla(0, 0%, 0%, 0.275) 43.7%,
    hsla(0, 0%, 0%, 0.35) 48.8%,
    hsla(0, 0%, 0%, 0.434) 54.5%,
    hsla(0, 0%, 0%, 0.528) 61.1%,
    hsla(0, 0%, 0%, 0.631) 68.7%,
    hsla(0, 0%, 0%, 0.744) 77.6%,
    hsla(0, 0%, 0%, 0.867) 87.9%,
    hsl(0, 0%, 0%) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
`

const InnerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;

  padding: 16px;

  color: white;

  filter: drop-shadow(0px 0px 4px hsl(0deg 0% 0% / 1));

  will-change: opacity;
  transition: opacity 300ms;
  opacity: 0;

  ${Wrapper}:hover & {
    transition: opacity 1200ms;
    transition-delay: 200ms;
    opacity: 1;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;

  color: white;

  filter: drop-shadow(0px 0px 4px hsl(0deg 0% 0% / 1));

  transition: bottom 800ms;

  ${Wrapper}:hover & {
    transition: bottom 400ms;
    bottom: 100px;
  }
`

const Title = styled.h1`
  grid-area: title;
`

const DateDisplay = styled.p`
  grid-area: date;
`

const PreviewBody = styled.p`
  grid-area: blurb;

  margin-block-start: 1.25rem;
  margin-block-end: 1.25rem;
  line-height: 1.5rem;
`

const More = styled.h5`
  grid-area: more;

  ${InnerWrapper}:hover & {
    color: ${COLORS.bordeaux};
  }
`

export default BlogPreview
