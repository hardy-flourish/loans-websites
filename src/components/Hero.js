import React, { useState, useEffect } from "react"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import tw from "tailwind.macro"
import css from "@emotion/css"
import Select from "react-select"
import Cta from "./Cta"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { IoMdArrowDropdown } from "react-icons/io"
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
        website: { in: ["Compare No Guarantor Loans"] }
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
        website: { in: ["Compare No Guarantor Loans"] }
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
    <>
      <BackgroundImage
        fluid={[
          heroBannerImage
            ? heroBannerImage.fluid
            : "linear-gradient(#393939,#393939)",
        ]}
        css={css`
          &::after,
          &::before {
            background-position: 20% 50%;
            background-size: cover;
            /* @lg */
            @media (min-width: 1024px) {
              background-position: 50% 50%;
              background-size: cover;
            }
          }
        `}
        style={{ backgroundSize: "", backgroundPosition: "" }}
      >
        <div
          css={css`
            /* @lg */
            @media (max-width: 1023px) {
              background-image: linear-gradient(
                66deg,
                rgba(235, 241, 245, 0.82) 0%,
                rgba(164, 193, 220, 0) 100%
              );
            }
          `}
        >
          <div className="container pt-6 md:pt-12 lg:pt-32    text-black ">
            <div className="row">
              <div className="col w-full lg:w-1/2"></div>
              <div className="col w-full lg:w-1/2">
                <div className=" text-right flex flex-col items-end">
                  <span id="handle"></span>
                  {mainHeadline && (
                    <h1 className=" text-xl md:text-3xl lg:text-4xl font-bold mb-3 mt-0  leading-tight">
                      {mainHeadline}
                    </h1>
                  )}
                  {subHeadline && (
                    <h2 className=" text-lg md:text-xl  font-normal mt-2 mb-6 md:mb-12   leading-snug max-w-sm">
                      {subHeadline}
                    </h2>
                  )}
                </div>
                <div className="hidden lg:block">
                  <Calculator></Calculator>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <div className="lg:hidden block">
        <Calculator></Calculator>
      </div>
      <Points points={points}></Points>
      {amount && (
        <div className="container py-12 lg:py-20">
          {" "}
          <div
            className="leading-relaxed "
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
    </>
  )

  function Calculator() {
    return (
      <div
        id="calculator"
        className="bg-white  lg_rounded-lg px-6 py-6 md:py-10 mt-2 mb-4 lg:mb-16 relative"
        css={css`
          .select {
            &__indicator-separator {
              display: none;
            }
            &__value-container {
              padding: 0;
            }
            &__menu {
              ${tw`bg-white -mx-2  py-2  border border-black  `}
              width: calc(100% + .5rem)
            }
            &__control,
            &__control--is-focused {
              ${tw`border-none shadow-none`}
              background-color: transparent;
            }
            &__option,
            &__single-value {
              ${tw`text-black text-lg   bg-tansparent`}
              &--is-selected {
                ${tw`text-white bg-brand-blue`}
              }
              &--is-focused {
                ${tw`bg-brand-dark  text-white`}
              }
            }
          }
        `}
      >
        <div className=" ">
          <h3 className="text-center text-xl md:text-2xl mt-0  mb-6  md:mb-10">
            How much do you want to borrow?
          </h3>
          <div className="row items-center justify-center mb-8">
            <div className="col w-full  md:w-2/5  flex-shrink ">
              {" "}
              <div className="border border-black  px-4 py-1 md:py-3   rounded-lg">
                {/* <Select
                  // menuIsOpen={true}
                  classNamePrefix="select"
                  isSearchable={false}
                  options={amountRange}
                  value={amount}
                  components={{
                    DropdownIndicator: ArrowDown,
                  }}
                  onChange={val => {
                    setAmount(val)
                  }}
                ></Select> */}
                <select
                  className="text-brand-dark text-lg bg-transparent outline-none   w-full py-2 -mx-1"
                  value={amount && amount.value}
                  onChange={e => {
                    initial && setInitial(false)
                    setAmount({
                      value: e.target.value,
                      label: `£${e.target.value}`,
                    })
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
            <div className="col col-collapse font-titillium  my-2  md:my-3  ">
              for
            </div>
            <div className="col w-full  md:w-2/5  ">
              <div className="border border-black  px-4 py-1 md:py-3    rounded-lg">
                {/* <Select
                  onMenuOpen={() => {}}
                  // menuIsOpen={true}
                  isSearchable={false}
                  classNamePrefix="select"
                  options={termSet}
                  value={term}
                  components={{ DropdownIndicator: ArrowDown }}
                  onChange={val => {
                    setTerm(val)
                  }}
                ></Select> */}
                <select
                  className="text-brand-dark text-lg bg-transparent outline-none  w-full py-2 -mx-1"
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
            <Cta className="w-64 h-16 shadow-lg"></Cta>
          </div>
        </div>
      </div>
    )
  }
}

function Points({ points }) {
  return (
    <div className="bg-brand-blue  py-4 lg:py-3">
      <div className="container lg:px-0 flex flex-wrap flex-col lg:flex-row justify-center py-2 lg:items-center">
        {points.points &&
          points.points.map(point => (
            <div
              className="text-white font-bold font-work flex items-center mr-4   py-2"
              key={point}
            >
              <div>
                {" "}
                <IoIosCheckmarkCircle className="text-brand-yellow w-6  h-6 mr-2" />
              </div>{" "}
              {point}
            </div>
          ))}
      </div>
    </div>
  )
}

function ArrowDown({ innerProps, isDisabled }) {
  return (
    <svg
      {...innerProps}
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={10}
      viewBox="0 0 17 15"
    >
      <g>
        <g>
          <path d="M8.032 14.486L-.195.236H16.26z" />
        </g>
      </g>
    </svg>
  )
}
