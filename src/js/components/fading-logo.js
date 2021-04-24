import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"
import { headerLogoVariant } from "../utils/motion-variants"
import { COLORS } from "../utils/constants"

import Wolf from "../../images/akla_wolf.png"

function FadingLogo({ text }) {
  const [nameShown, setNameShown] = useState(false)

  return (
    <BareLink to="/">
      <Wrapper
        onMouseEnter={() => setNameShown(true)}
        onMouseLeave={() => setNameShown(false)}
      >
        <img src={Wolf} alt="Aklaran" height="50px" width="50px" />
        <Name
          variants={headerLogoVariant}
          initial="hidden"
          animate={nameShown ? "show" : "hidden"}
        >
          {text}
        </Name>
      </Wrapper>
    </BareLink>
  )
}

FadingLogo.propTypes = {
  text: PropTypes.string,
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
