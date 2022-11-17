import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import FadingLogo from "./fading-logo"
import GithubIcon from "../../images/svg/github.svg"
import LinkedInIcon from "../../images/svg/linkedin.svg"
import YoutubeIcon from "../../images/svg/youtube.svg"

import { COLORS } from "../utils/constants"
import { fadeVariant } from "../utils/motion-variants"

import Headroom from "react-headroom";
import { Link } from "gatsby"

const Header = () => (
  <Headroom 
    upTolerance={10} 
    downTolerance={2}>
    <MaxWidthWrapper>
      <Wrapper variants={fadeVariant} initial="initial" animate="enter">
        <FadingLogo text1="Bo" text2="Aklaran" />

        <FirstTextLink to="/gallery/"><h2>Gallery</h2></FirstTextLink>

        {/* <FirstLink href="https://github.com/Aklaran">
          <GithubIcon height="30px" width="30px" />
        </FirstLink>

        <SocialLink href="https://www.linkedin.com/in/siri-tembunkiart/">
          <LinkedInIcon height="30px" width="30px" />
        </SocialLink>

        <SocialLink href="https://www.youtube.com/watch?v=hsJUNatpDNw">
          <YoutubeIcon height="30px" width="30px" />
</SocialLink> */}
      </Wrapper>
    </MaxWidthWrapper>
  </Headroom>
)

const MaxWidthWrapper = styled(motion.header)`
  position: sticky;
  top: 0px;
  width: 100%;
  background-image: linear-gradient(
    to top,
    rgba(242, 242, 242, 0),
    rgba(242, 242, 242, 1) 40%
  );
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-top: 18px;
  padding-bottom: 36px;
  max-width: 1250px;
  width: 90%;
  margin-inline-start: auto;
  margin-inline-end: auto;
  margin-bottom: 90px;

  // https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/
  // Because flex gap isn't supported on Safari yet >.<
  & > * + * {
    margin-left: 11px;
  }
`

const SocialLink = styled.a`
  &:hover {
    fill: ${COLORS.bordeaux};
  }
`

const FirstLink = styled(SocialLink)`
  margin-left: auto;
`

const TextLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  &:hover {
    color: ${COLORS.bordeaux};
  }
`

const FirstTextLink = styled(TextLink)`
  margin-left: auto;
`

export default Header
