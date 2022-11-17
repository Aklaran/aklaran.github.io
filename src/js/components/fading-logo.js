import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  primaryHeaderLogoVariant,
  secondaryHeaderLogoVariant,
  headerLogoImageVariant,
} from "../utils/motion-variants"

import Wolf from "../../images/akla_wolf.png"
import BlackWolf from "../../images/svg/wolf.svg"

function FadingLogo({ text1, text2 }) {
  const [nameShown, setNameShown] = useState(false)

  return (
    <BareLink
      to="/"
      onMouseEnter={() => setNameShown(true)}
      onMouseLeave={() => setNameShown(false)}
    >
      <Overlay>
        <motion.img
          variants={headerLogoImageVariant}
          initial="hidden"
          animate={nameShown ? "show" : "hidden"}
          src={Wolf}
          alt="Aklaran"
          height="50px"
          width="50px"
        />
        <Name
          variants={secondaryHeaderLogoVariant}
          initial="hidden"
          animate={nameShown ? "show" : "hidden"}
        >
          {text2}
        </Name>
      </Overlay>
      <Wrapper>
        <BlackWolf alt="Aklaran" height="50px" width="50px" />
        <Name
          variants={primaryHeaderLogoVariant}
          initial="show"
          animate={nameShown ? "hidden" : "show"}
        >
          {text1}
        </Name>
      </Wrapper>
    </BareLink>
  )
}

FadingLogo.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  // https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/
  // Because flex gap isn't supported on Safari yet >.<
  & > * + * {
    margin-left: 11px;
  }
`

const Overlay = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
`

const Name = styled(motion.h1)`
  color: black;
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
`

const BareLink = styled(Link)`
  text-decoration: none;
  position: relative;
`

export default FadingLogo
