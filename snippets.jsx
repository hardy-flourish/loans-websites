
import CookieConsent from "react-cookie-consent"

  ;<CookieConsent
    style={{ alignItems: "center" }}
    buttonText="Accept"
    buttonStyle={{ color: "#fff", background: "#ff5e14" }}
    enableDeclineButton={false}
    flipButtons
  >
    <div
      css={css`
        a {
          text-decoration: underline;
          color: #ff5e14;
        }
        p {
          margin-bottom: 0;
        }
      `}
      dangerouslySetInnerHTML={{ __html: cookies && cookies.text.md.html }}
    ></div>
  </CookieConsent><div className="bg-brand-gray-bg">
  <div className="container text-center pb-16 -mt-8">
    <Cta className="h-20 px-12"></Cta>
  </div>
</div>

import React from "react"

import Cta from "./Cta"
import { useStaticQuery, graphql, Link } from "gatsby"
import logo from "../images/logo.svg"
import { GiHamburgerMenu } from "react-icons/gi"
import css from "@emotion/css"
export default function Header({ setMenuIsOpen }) {
  const { menu } = useStaticQuery(graphql`
    {
      menu: allContentfulPage(
        filter: {
          node_locale: { eq: "en-US" }
          addToMainNavigation: { eq: true }
        }
      ) {
        nodes {
          slug
          isThisAGuide
          navigationTitle
        }
      }
    }
  `)
  return (
    <div className="shadow">
      <div className="container py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/">
              {" "}
              <img
                className=" w-full"
                css={css`
                  max-width: 250px;
                  /* @lg */
                  @media (min-width: 1024px) {
                    max-width: 300px;
                  }
                `}
                src={logo}
              ></img>
            </Link>
          </div>
          <ul className="navigation lg:flex items-center justify-end hidden text-sm">
            <Links menu={menu}></Links>
            <li>
              <Cta className="relative z-50"></Cta>
            </li>
          </ul>
          <div className="lg:hidden">
            <GiHamburgerMenu
              onClick={() => {
                setMenuIsOpen(true)
              }}
              className="w-10 h-10 text-brand-blue"
            ></GiHamburgerMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

function Links({ menu }) {
  return (
    <>
      <li className="group py-5 relative">
        <a className="uppercase mr-6 tracking-wide cursor-pointer">Guides</a>
        <ul
          css={css`
            left: -1rem;
          `}
          className="absolute   pt-12  w-56   p-4 z-30  bg-white hidden group-hover:block"
        >
          {" "}
          {menu &&
            menu.nodes
              .filter(i => i.isThisAGuide)
              .map(item => {
                return (
                  <li className="py-2">
                    <Link
                      className="uppercase mr-6 lg:mr-0 tracking-wide hover:text-brand-orange"
                      key={item.slug}
                      to={
                        item.slug == "/"
                          ? "/"
                          : `/${item.slug}/`.replace("//", "/")
                      }
                    >
                      {item.navigationTitle}
                    </Link>
                  </li>
                )
              })}
        </ul>
      </li>
      {menu &&
        menu.nodes
          .filter(i => !i.isThisAGuide)
          .map(item => {
            return (
              <li className="py-2">
                <Link
                  className="uppercase mr-6  tracking-wide hover:text-brand-orange"
                  key={item.slug}
                  to={
                    item.slug == "/" ? "/" : `/${item.slug}/`.replace("//", "/")
                  }
                >
                  {item.navigationTitle}
                </Link>
              </li>
            )
          })}
    </>
  )
}

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
      repArk: contentfulRepresentativeApr(node_locale: { eq: "en-US" }) {
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
      points: contentfulCoreValuePropositionBox(node_locale: { eq: "en-US" }) {
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
        <div className="container pt-6 md:pt-12 lg:pt-48 pb-12 text-white ">
          <div className="text-center lg:text-left">
            {" "}
            {mainHeadline && (
              <h1 className="text-2xl  md:text-3xl lg:text-4xl mt-0 font-bold mb-3 leading-snug">
                {mainHeadline}
              </h1>
            )}
            {subHeadline && (
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold  mt-3 mb-6 md:mb-12 leading-snug">
                {subHeadline}
              </h2>
            )}
          </div>
          <div
            id="calculator"
            className="bg-white rounded-lg px-6 py-6 md:py-10 mb-16 relative"
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
            <div className="row  small lg:flex-no-wrap   items-stretch">
              <div className="col    flex-shrink lg:flex items-center flex-col items-stretch justify-center w-full md:w-1/2  lg:w-1/4 ">
                <div className="bg-brand-gray-bg  px-4 pt-2 pb-1 md:pt-3 md:mb-3 mb-4 lg:mb-0 rounded-lg">
                  <div className="label">Loan Amount</div>
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
                    className="text-brand-dark text-lg bg-transparent outline-none font-bold w-full py-2 -mx-1"
                    onChange={e => {
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
              <div className="col  col-sm flex-shrink lg:flex items-center flex-col items-stretch justify-center w-full md:w-1/2  lg:w-1/4  ">
                <div className="bg-brand-gray-bg  px-4 px-4 pt-2 pb-1 md:pt-3 md:mb-3  mb-4 lg:mb-0  rounded-lg">
                  <div className="label">Loan Term</div>
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
                    className="text-brand-dark text-lg bg-transparent outline-none font-bold w-full py-2 -mx-1"
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
              <div className="col w-full lg:w-auto ">
                <Cta className="w-full h-full whitespace-no-wrap lg:w-auto flex items-center justify-center"></Cta>
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
              className="leading-relaxed px-3 lg:px-0"
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
