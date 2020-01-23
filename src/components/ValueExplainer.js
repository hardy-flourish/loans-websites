import React from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import css from "@emotion/css"
import tw from "tailwind.macro"
import Image from "gatsby-image"
import Cta from "@components/Cta"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
export default function ValueExplainer() {
  const { ValueExplainer } = useStaticQuery(graphql`
    {
      ValueExplainer: contentfulValueExplainer(
        website: { in: ["Compare Instant Loans"] }
      ) {
        headline
        firstSectionTitle
        firstSectionContent
        firstSectionImage {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        secondSectionTitle
        secondSectionContent
        secondSectionImage {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        thirdSectionTitle
        thirdSectionContent
        thirdSectionImage {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  `)
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { dots: true, slidesToShow: 1.1 },
      },
    ],
  }
  return (
    <div>
      <div className="container py-16 lg:py-20">
        <h3 className="text-center leading-snug font-bold mt-0 mb-16 lg:mb-20">
          {ValueExplainer.headline}
        </h3>
        <div
          css={css`
            .badge {
              ${tw`absolute bg-brand-green z-10 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold   leading-none`}
              right: 1.75rem;
              top: 1rem;
            }
            .title {
              ${tw`font-bold text-lg text-center text-brand-green   mt-6 font-normal text-2xl mb-3`}
            }
            .content {
              ${tw`text-base text-center text-brand-gray-light`}
            }
            .slide {
              ${tw`px-3  `}
            }

            .slick {
              &-slide {
                height: 100%;
              }
              &-list {
                ${tw`pl-4 lg:pl-0`}
                overflow-y: visible;

                padding-bottom: 1rem;
              }
              &-dots {
                bottom: -40px;
                li {
                  margin: 0 0.75rem;
                  button:before {
                    ${tw`bg-brand-gray-light rounded-full text-transparent`}
                  }
                  &.slick-active button:before {
                    ${tw`bg-brand-green rounded-full text-transparent`}
                  }
                }
              }
            }

            .card {
              ${tw` bg-white shadow-lg rounded-lg overflow-hidden`}
            }
          `}
        >
          <div className="-mx-10 lg:mx-0">
            <Slider {...settings}>
              <div className="relative slide itemss">
                <div className="card">
                  <BackgroundImage
                    fluid={ValueExplainer.firstSectionImage.fluid}
                  >
                    <div className="h-48"></div>
                  </BackgroundImage>
                  <div className="p-4">
                    {" "}
                    <h3 className="title">
                      {ValueExplainer.firstSectionTitle}
                    </h3>
                    <p className="content">
                      {ValueExplainer.firstSectionContent}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative slide">
                <div className="card">
                  <BackgroundImage
                    fluid={ValueExplainer.secondSectionImage.fluid}
                  >
                    <div className="h-48"></div>
                  </BackgroundImage>
                  <div className="p-4">
                    {" "}
                    <h3 className="title">
                      {ValueExplainer.secondSectionTitle}
                    </h3>
                    <p className="content">
                      {ValueExplainer.secondSectionContent}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative slide">
                <div className="card">
                  <BackgroundImage
                    fluid={ValueExplainer.thirdSectionImage.fluid}
                  >
                    <div className="h-48"></div>
                  </BackgroundImage>
                  <div className="p-4">
                    {" "}
                    <h3 className="title">
                      {ValueExplainer.thirdSectionTitle}
                    </h3>
                    <p className="content">
                      {ValueExplainer.thirdSectionContent}
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="text-center mt-20 lg:mt-16">
          <Cta className="h-20 px-12" />
        </div>
      </div>
    </div>
  )
}
