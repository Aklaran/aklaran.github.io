import React from "react"
import Seo from "../js/components/seo"
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import styled from "styled-components"
import Gallery from '@browniebroke/gatsby-image-gallery'

import { fadeVariant } from "../js/utils/motion-variants"

import { COLORS } from "../js/utils/constants"

function PhotoDump({ data }) {
    const images = data.allImageSharp.edges.map(({ node }) => ({
        ...node,
        caption: node.fields.exif.raw.image.ImageDescription
    }))

    return (
        <motion.div
        key={"Gallery"}
        variants={fadeVariant}
        initial="initial"
        animate="enter"
        exit="initial"
        >
        <Seo title="Gallery" />
        <MaxWidthWrapper>
          <Title>it's like instagram but i don't have to care about how few followers i have</Title>
          <Gallery images={images} />
        </MaxWidthWrapper>
        </motion.div>
    )
}

const MaxWidthWrapper = styled.div`
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.h5`
  text-align: center;
  text-transform: lowercase;
  color: ${COLORS.bordeaux};
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  margin-bottom: 4rem;
`

export const pageQuery = graphql`
query ImagesForGallery {
    allImageSharp(
      filter: {fields: {exif: {raw: {image: {ImageDescription: {ne: null}}}}}}
    ) {
      edges {
        node {
          thumb: gatsbyImageData(width: 270, height: 270, placeholder: BLURRED)
          full: gatsbyImageData(layout: FULL_WIDTH)
          fields {
            exif {
              raw {
                image {
                  ImageDescription
                }
              }
            }
          }
        }
      }
    }
  }  
`

export default PhotoDump