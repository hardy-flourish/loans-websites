import React, { useState, useEffect } from "react"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import tw from "tailwind.macro"
import css from "@emotion/css"
import Select from "react-select"
import Cta from "./Cta"
import { IoIosCheckmarkCircle } from "react-icons/io"
import arrow from "../images/get-started.png"
export default function Hero({
  data: {
    heroBannerImage,
    mainHeadline,
    subHeadline,
    minLoanAmount = 100,
    maxLoanAmount = 10000,
    defaultLoanAmount = 2000,
  },
}) {
  const { repArk, points } = useStaticQuery(graphql`
    {
      repArk: contentfulRepresentativeApr(
        node_locale: { eq: "en-US" }
        website: { in: ["Compare Guarantor Loans"] }
      ) {
        normal: repApr {
          md: childMarkdownRemark {
            html
          }
        }
        below: repAprBelow1k {
          md: childMarkdownRemark {
            html
          }
        }
      }
      points: contentfulCoreValuePropositionBox(
        node_locale: { eq: "en-US" }
        website: { in: ["Compare Guarantor Loans"] }
      ) {
        points
      }
    }
  `)

  const amountRange = [
    ...Array.from({ length: (maxLoanAmount - minLoanAmount) / 100 + 1 }).map(
      (_, i, ar) => ({
        value: minLoanAmount + 100 * i,
        label: `£${minLoanAmount + 100 * i}`,
      })
    ),
  ]

  const [amount, setAmount] = useState(
    amountRange.filter(({ value }) => value == defaultLoanAmount)[0]
  )

  const termsValues = [
    [3, 6], // 500
    [6, 12, 18, 24, 36], // 1000
    [12, 18, 24, 36], // 5000
    [24, 30, 36, 42, 48, 60], // 10000
  ]
  function termsSetIndex(value) {
    if (value <= 500) {
      return 0
    } else if (value <= 1000) {
      return 1
    } else if (value <= 5000) {
      return 2
    } else if (value <= 10000) {
      return 3
    }
  }

  const [term, setTerm] = useState({
    value: termsValues[termsSetIndex(defaultLoanAmount)][0],
    label: `${termsValues[termsSetIndex(defaultLoanAmount)][0]} months`,
  })
  const [termSet, setTermSet] = useState([
    ...termsValues[termsSetIndex(defaultLoanAmount)].map(item => ({
      value: item,
      label: `${item} months`,
    })),
  ])
  useEffect(() => {
    if (amount) {
      let set = termsValues[termsSetIndex(amount.value)]
      setTermSet([
        ...termsValues[termsSetIndex(amount.value)].map(item => ({
          value: item,
          label: `${item} months`,
        })),
      ])
      if (!set.includes(term.value)) {
        setTerm({
          value: termsValues[termsSetIndex(amount.value)][0],
          label: `${termsValues[termsSetIndex(amount.value)][0]} months`,
        })
      }
    }
  }, [amount])

  return (
    <BackgroundImage
      fluid={[
        heroBannerImage
          ? heroBannerImage.fluid
          : "linear-gradient(#393939,#393939)",
      ]}
      css={css`
        &::after,
        &::before {
          background-position: 77% 40%;
          background-size: auto 105%;
          /* @lg */
          @media (min-width: 1024px) {
            background-position: 50% 10%;
            background-size: cover;
          }
        }
      `}
      style={{ backgroundSize: "", backgroundPosition: "" }}
    >
      <div
        css={css`
          background-image: linear-gradient(
            rgba(31, 31, 31, 0.6),
            rgba(31, 31, 31, 0.4)
          );
          /* @lg */
          @media (min-width: 1024px) {
            background-image: linear-gradient(
              rgba(21, 21, 21, 0.2),
              rgba(21, 21, 21, 0.2)
            );
          }
        `}
      >
        <div className="container pt-16 lg:pt-48 pb-12 text-white ">
          <div className="text-center lg:text-left">
            {" "}
            {mainHeadline && (
              <h1 className="text-4xl font-bold mb-3 leading-snug">
                {mainHeadline}
              </h1>
            )}
            {subHeadline && (
              <h2 className="text-2xl font-bold  mt-3 mb-12 leading-snug">
                {subHeadline}
              </h2>
            )}
          </div>
          <div
            id="calculator"
            className="bg-white rounded-lg px-8 py-10 mb-16 relative"
            css={css`
              .label {
                ${tw`text-brand-gray-light text-sm font-bold -mb-2`}
              }
              .select {
                &__indicator-separator {
                  display: none;
                }
                &__value-container {
                  padding: 0;
                }
                &__menu {
                  ${tw`bg-brand-gray-bg -mx-4 px-2 py-2   border-none shadow-none`}
                  width: calc(100% + 2rem)
                }
                &__control,
                &__control--is-focused {
                  ${tw`border-none shadow-none`}
                  background-color: transparent;
                }
                &__option,
                &__single-value {
                  ${tw`text-black text-lg font-semibold bg-tansparent`}
                  &--is-selected {
                    ${tw`text-white bg-brand-orange`}
                  }
                  &--is-focused {
                    ${tw`bg-brand-gray-light text-white`}
                  }
                }
              }
            `}
          >
            <img
              src={arrow}
              css={css`
                ${tw`absolute w-32 hidden lg:block`}
                left: -6rem;
              `}
            ></img>
            <div className="row lg:flex-no-wrap  items-center ">
              <div className="col flex-shrink lg:flex items-center flex-col items-stretch justify-center w-full xs:w-1/2 lg:w-1/4 ">
                <div className="lg:h-20 flex flex-col justify-center bg-brand-gray-bg  px-4 py-3 mb-8 lg:mb-0 rounded-lg">
                  <div className="label">Loan Amount</div>
                  <Select
                    // menuIsOpen={true}
                    classNamePrefix="select"
                    isSearchable={false}
                    options={amountRange}
                    value={amount}
                    onChange={val => {
                      setAmount(val)
                    }}
                  ></Select>
                </div>
              </div>
              <div className="col flex-shrink lg:flex items-center flex-col items-stretch justify-center w-full xs:w-1/2 lg:w-1/4  ">
                <div className="lg:h-20 flex flex-col justify-center bg-brand-gray-bg  px-4 py-3 mb-8 lg:mb-0  rounded-lg">
                  <div className="label">Loan Term</div>
                  <Select
                    onMenuOpen={() => {}}
                    // menuIsOpen={true}
                    isSearchable={false}
                    classNamePrefix="select"
                    options={termSet}
                    value={term}
                    onChange={val => {
                      setTerm(val)
                    }}
                  ></Select>
                </div>
              </div>
              <div className="col w-full lg:w-auto  flex flex-col justify-center   ">
                <Cta className="w-full lg:h-20  whitespace-no-wrap lg:w-auto flex items-center justify-center"></Cta>
              </div>
              <div className="col w-auto mt-8 lg:mt-0">
                {points.points &&
                  points.points.map(point => (
                    <div
                      className="text-black font-bold font-work flex items-stretch"
                      key={point}
                    >
                      <div>
                        {" "}
                        <IoIosCheckmarkCircle className="text-brand-orange w-5 h-5 mr-2 mt-1" />
                      </div>{" "}
                      {point}
                    </div>
                  ))}
              </div>
            </div>
            {/* <Select menuIsOpen={true} classNamePrefix="select"></Select> */}
          </div>
          {amount && (
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  amount.value < 1000
                    ? repArk.below.md.html
                    : repArk.normal.md.html,
              }}
            ></div>
          )}
        </div>
      </div>
    </BackgroundImage>
  )
}
