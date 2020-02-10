import React, { useState, useEffect } from "react"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import tw from "tailwind.macro"
import css from "@emotion/css"
import Select from "react-select"
import Cta from "./Cta"
import { IoIosCheckmarkCircle } from "react-icons/io"
import arrow from "../images/get-started.png"
import queryString from "query-string"
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
        website: { in: ["Compare Instant Loans"] }
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
        website: { in: ["Compare Instant Loans"] }
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
  const [initial, setInitial] = useState(true)
  useEffect(() => {
    if (amount && !initial) {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { lt, la } = queryString.parse(window.location.search)
      if (lt) {
        setTerm({
          value: lt,
          label: lt + " months",
        })
      }

      if (la && la % 100 == 0) {
        setAmount({
          value: la,
          label: "£" + la,
        })
      }
    }
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__loanAmount = window.localStorage.setItem(
        "__loanAmount",
        amount.value
      )
    }
  }, [amount])
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__loanAmount = window.localStorage.setItem(
        "__loanTerm",
        term.value
      )
    }
  }, [term])
  return (
    <div
      css={css`
        margin-top: -80px;
      `}
      id="hero"
    >
      {" "}
      <BackgroundImage
        fluid={[
          heroBannerImage
            ? heroBannerImage.fluid
            : "linear-gradient(#5b41bb,#5b41bb)",
        ]}
        css={css`
          &::after,
          &::before {
            background-position: 30% 0%;

            /* @lg */
            @media (min-width: 1024px) {
              background-position: 50% 50%;
            }
          }
        `}
        style={{ backgroundPosition: "" }}
      >
        <div>
          <div className="container px-4 pt-24  md:pt-32 lg:pt-64 pb-12  text-white ">
            <div className="row">
              <div className="col w-full lg:w-1/2">
                <div className=" ">
                  <span id="handle"></span>
                  {mainHeadline && (
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 mt-0 leading-tight">
                      {mainHeadline}
                    </h1>
                  )}

                  {subHeadline && (
                    <h2
                      className="text-lg md:text-xl  font-normal mt-3 md:mb-12 leading-snug"
                      css={css`
                        strong {
                          ${tw`text-brand-green`}
                        }
                      `}
                    >
                      {subHeadline}
                    </h2>
                  )}
                </div>
                <div className="hidden lg:block">
                  <Points points={points} />
                </div>
              </div>
              <div className="col w-full lg:w-1/2">
                {" "}
                <div
                  id="calculator"
                  className="bg-white rounded-lg   px-6 py-6 md:py-10 mt-2 mb-16 relative"
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
                        ${tw`text-brand-gray-light text-lg   bg-tansparent`}
                        max-width: calc(100% - 2px);
                        &--is-selected {
                          ${tw`text-white bg-brand-green`}
                        }
                        &--is-focused {
                          ${tw`bg-brand-gray-light text-white`}
                        }
                      }
                    }
                  `}
                >
                  <div className=" ">
                    <h3 className="text-center text-brand-gray-light text-xl lg:text-2xl mt-0  mb-6 md:mb-10">
                      How much do you want to borrow?
                    </h3>
                    <div className="row items-center justify-center mb-8">
                      <div className="col w-full   lg:w-2/5  flex-shrink ">
                        {" "}
                        <div className="bg-brand-gray-bg  pl-4 pr-1 py-1 md:py-3   rounded-lg">
                          {/* <Select
                            // menuIsOpen={true}
                            classNamePrefix="select"
                            isSearchable={false}
                            options={amountRange}
                            value={amount}
                            onChange={val => {
                              setAmount(val)
                            }}
                          ></Select> */}
                          <select
                            className="text-brand-dark text-lg bg-transparent outline-none  w-full py-2 -mx-1"
                            value={amount && amount.value}
                            onChange={e => {
                              initial && setInitial(false)
                              let newVal = amountRange.filter(
                                ({ value }) => value == e.target.value
                              )[0]
                              setAmount(newVal)
                            }}
                          >
                            {amountRange.map(item => {
                              return (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col   col-collapse text-brand-gray-light font-bold font-titillium  xs:my-1 my-3  ">
                        for
                      </div>
                      <div className="col w-full   lg:w-2/5  ">
                        <div className="bg-brand-gray-bg  pl-4 pr-1 py-1 md:py-3    rounded-lg">
                          {/* <Select
                            onMenuOpen={() => {}}
                            // menuIsOpen={true}
                            isSearchable={false}
                            classNamePrefix="select"
                            options={termSet}
                            value={term}
                            onChange={val => {
                              setTerm(val)
                            }}
                          ></Select> */}
                          <select
                            className="text-brand-dark text-lg bg-transparent outline-none   w-full py-2 -mx-1"
                            value={term && term.value}
                            onChange={e => {
                              setTerm({
                                value: e.target.value,
                                label: `${e.target.value} months`,
                              })
                            }}
                          >
                            {termSet.map(item => {
                              return (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col w-full  justify-center flex flex-shrink">
                      <Cta className="w-64 h-16"></Cta>
                    </div>
                  </div>
                  {/* <Select menuIsOpen={true} classNamePrefix="select"></Select> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
      {amount && (
        <div className="container pt-20">
          {" "}
          <div
            className="leading-relaxed bg-brand-gray-bg text-brand-gray-light p-6 rounded"
            css={css`
              p:last-of-type {
                margin-bottom: 0;
              }
              strong {
                ${tw`text-xl`}
              }
            `}
            dangerouslySetInnerHTML={{
              __html:
                amount.value < 1000
                  ? repArk.below.md.html
                  : repArk.normal.md.html,
            }}
          ></div>
        </div>
      )}
    </div>
  )
}

function Points({ points }) {
  return (
    <>
      {" "}
      {points.points &&
        points.points.map(point => (
          <div
            className="text-white font-bold font-work flex items-stretch border-l-2 border-white pl-6"
            key={point}
          >
            <div>
              {" "}
              <IoIosCheckmarkCircle className="text-brand-green w-5 h-5 mr-2 mt-1" />
            </div>{" "}
            {point}
          </div>
        ))}
    </>
  )
}
