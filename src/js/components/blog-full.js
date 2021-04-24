import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { COLORS } from "../utils/constants"

function Blog({ title, date, content }) {
  return (
    <>
      <Title>{title}</Title>

      <Wrapper>
        <Date>{date}</Date>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </Wrapper>
    </>
  )
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
}

const Wrapper = styled.div`
  max-width: 700px;
  margin-inline: auto;
  margin-bottom: 25rem;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 4.854rem;
  font-size: 3rem;
`

const Date = styled.h6`
  color: ${COLORS.gray700};
  margin-bottom: 2.427rem;
`

const Content = styled.article`
  line-height: 1.618rem;

  & > p {
    margin-bottom: 1.618rem;

    & > a {
      color: ${COLORS.bordeaux};
      text-decoration: none;
    }
  }

  & > blockquote {
    border-left: 3px solid ${COLORS.bordeaux};
    color: ${COLORS.gray700};
    font-size: 0.9rem;
    font-style: italic;
    margin-bottom: 1.618rem;
    margin-left: 4rem;
    padding: 1rem 2rem;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: -4px;
      height: 2rem;
      background-color: ${COLORS.gray900};
      width: 5px;
      margin-top: -0.8rem;
    }

    &:after {
      content: '"';
      position: absolute;
      top: 50%;
      left: -0.6rem;
      color: ${COLORS.bordeaux};
      font-style: normal;
      font-size: 3rem;
    }
  }
`

export default Blog
