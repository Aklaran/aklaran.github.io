import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { COLORS } from "../utils/constants"
import SubscriptionForm from "./sub-form"

function Blog({ title, date, content }) {
  return (
    <>
      <Title>{title}</Title>

      <Wrapper>
        <Date>{date}</Date>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </Wrapper>
      <SubscriptionForm />
      <Spacer />
    </>
  )
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
}

const Wrapper = styled.div`
  margin-bottom: 5rem;
`

const Title = styled.h1`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 4.428rem;
  font-size: 3rem;
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
`

const Date = styled.h6`
  width: 90%;
  max-width: 800px;
  margin-inline-start: auto;
  margin-inline-end: auto;
  color: ${COLORS.gray700};
  margin-bottom: .618rem;
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
`

const Content = styled.article`
  line-height: 1.618rem;

  & > p {
    width: 90%;
    max-width: 800px;
    margin-inline-start: auto;
    margin-inline-end: auto;
    margin-bottom: 1.618rem;
    font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;

    & > a {
      color: ${COLORS.bordeaux};
      text-decoration: none;
    }
  }

  & > h1 {
    width: 90%;
    max-width: 800px;
    margin-inline-start: auto;
    margin-inline-end: auto;
    margin-bottom: 1.618rem;
    margin-top: 4.8rem;
    font-size:2rem;
    text-align:center;
  }

  & > span {
    margin-bottom: 1.618rem;
  }
  
  & figcaption {
    width: 90%;
    max-width: 800px;
    margin-inline-start: auto;
    margin-inline-end: auto;
    text-align: center;
    color: ${COLORS.gray500}
  }

  & > blockquote {
    border-left: 3px solid ${COLORS.bordeaux};
    color: ${COLORS.gray700};
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

  // TODO: get this selector to work and make images 100vh while maintaining aspect ratio
  & > span > a > img {
    width: 500px;
  }
`

const Spacer = styled.div`
  height: 1px;
`

export default Blog
