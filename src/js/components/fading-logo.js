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
    <BareLink to="/">
      <Wrapper
        onMouseEnter={() => setNameShown(true)}
        onMouseLeave={() => setNameShown(false)}
      >
        <BlackWolf alt="Aklaran" height="50px" width="50px" />
        <motion.img
          variants={headerLogoImageVariant}
          initial="hidden"
          animate={nameShown ? "show" : "hidden"}
          src={Wolf}
          alt="Aklaran"
          height="50px"
          width="50px"
          style={{ marginLeft: "-60px" }}
        />
        <Name
          variants={secondaryHeaderLogoVariant}
          initial="hidden"
          animate={nameShown ? "show" : "hidden"}
        >
          {text2}
        </Name>
        <Name
          variants={primaryHeaderLogoVariant}
          initial="show"
          animate={nameShown ? "hidden" : "show"}
          style={{ marginLeft: "-115px" }}
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
  gap: 10px;
`

const Name = styled(motion.h1)`
  color: black;
`

const BareLink = styled(Link)`
  text-decoration: none;
`

export default FadingLogo
