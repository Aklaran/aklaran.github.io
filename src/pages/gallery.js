import React from "react"
import Seo from "../js/components/seo"
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import styled from "styled-components"
import Gallery from '@browniebroke/gatsby-image-gallery'

import { fadeVariant } from "../js/utils/motion-variants"

import { COLORS } from "../js/utils/constants"

function PhotoDump({ data }) {
    const images = data.allFile.edges.map(({ node }) => node.childImageSharp)

    return (
        <motion.div
        key={"Gallery"}
        variants={fadeVariant}
        initial="initial"
        animate="enter"
        exit="initial"
        >
        <Seo title="Gallery" />
        <Title>Le Galerie</Title>
        <Gallery images={images} />
        </motion.div>
    )
}

const Title = styled.h5`
  text-align: center;
  text-transform: lowercase;
  color: ${COLORS.bordeaux};
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
`

export const pageQuery = graphql`
  query ImagesForGallery {
    allFile(filter: {extension: {eq: "jpg"}}) {
      edges {
        node {
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default PhotoDump
