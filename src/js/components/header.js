import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import FadingLogo from "./fading-logo"
import GithubIcon from "../../images/svg/github.svg"
import LinkedInIcon from "../../images/svg/linkedin.svg"
import YoutubeIcon from "../../images/svg/youtube.svg"

import { COLORS } from "../utils/constants"

// Animation Imports
import { motion } from "framer-motion"
import {
  landingContainerVariant,
  landingItemVariant,
} from "../utils/motion-variants"

const Header = ({ atHome }) => (
  <Wrapper>
    <FadingLogo text="Aklaran" />
    <FirstLink href="https://github.com/Aklaran">
      <GithubIcon height="30px" width="30px" />
    </FirstLink>

    <SocialLink href="https://www.linkedin.com/in/siri-tembunkiart/">
      <LinkedInIcon height="30px" width="30px" />
    </SocialLink>

    <SocialLink href="https://www.youtube.com/watch?v=hsJUNatpDNw">
      <YoutubeIcon height="30px" width="30px" />
    </SocialLink>
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 11px;
  padding: 18px;
  max-width: 1200px;
  margin-inline: auto;
  margin-bottom: 90px;
`

const SocialLink = styled.a`
  &:hover {
    fill: ${COLORS.bordeaux};
  }
`

const FirstLink = styled(SocialLink)`
  margin-left: auto;
`

export default Header
