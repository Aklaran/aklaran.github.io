import React from "react"
import Seo from "../js/components/seo"
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import styled from "styled-components"

import { fadeVariant } from "../js/utils/motion-variants"

import { COLORS } from "../js/utils/constants"

import { GatsbyImage } from "gatsby-plugin-image"

function PhotoDump({ data }) {
  const images = data.allImageSharp.edges.map(({ node }) => ({
    ...node,
    caption: node.fields.exif.raw.image.ImageDescription,
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
        <Title>
          it's like instagram but i don't have to care about how few followers i
          have
        </Title>
        <Gallery>
          {images.map((image) => (
            <ImageWrapper>
              <GatsbyImage image={image.thumb} alt="image" />
            </ImageWrapper>
          ))}
        </Gallery>
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
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman,
    Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
  margin-bottom: 4rem;
`

const Gallery = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 8px;
  justify-items: center;
`

const ImageWrapper = styled.div`
  will-change: transform;
  overflow: hidden;

  .gatsby-image-wrapper {
    transition: transform 500ms;
    transform: scale(1.1);
  }

  &:hover .gatsby-image-wrapper {
    transform: scale(1);
    transition: transform 250ms;
  }
`

export const pageQuery = graphql`
  query ImagesForGallery {
    allImageSharp(
      filter: {
        fields: { exif: { raw: { image: { ImageDescription: { ne: null } } } } }
      }
    ) {
      edges {
        node {
          thumb: gatsbyImageData(width: 300, height: 300, placeholder: BLURRED)
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
