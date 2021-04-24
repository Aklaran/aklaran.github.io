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
  }
`

export default Blog
