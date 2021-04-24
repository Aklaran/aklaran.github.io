import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import FadingLogo from "./fading-logo"
import GithubIcon from "../../images/svg/github.svg"
import LinkedInIcon from "../../images/svg/linkedin.svg"
import YoutubeIcon from "../../images/svg/youtube.svg"

import { COLORS } from "../utils/constants"
import { fadeVariant } from "../utils/motion-variants"

const Header = () => (
  <MaxWidthWrapper>
    <Wrapper variants={fadeVariant} initial="initial" animate="enter">
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
  </MaxWidthWrapper>
)

const MaxWidthWrapper = styled(motion.header)`
  position: sticky;
  top: 0px;
  width: 100%;
  background-image: linear-gradient(
    to top,
    rgba(242, 242, 242, 0),
    rgba(242, 242, 242, 1) 30%
  );
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 11px;
  padding-top: 18px;
  padding-bottom: 36px;
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
