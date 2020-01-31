import React, { useEffect } from "react"
import Cta from "./Cta"
import { useStaticQuery, graphql, Link } from "gatsby"
import logo from "../images/logo.png"
import { FiMenu } from "react-icons/fi"
import css from "@emotion/css"
import { Global } from "@emotion/core"
import tw from "tailwind.macro"
export default function Header({ setMenuIsOpen }) {
  const { menu } = useStaticQuery(graphql`
    {
      menu: allContentfulPage(
        filter: {
          node_locale: { eq: "en-US" }
          website: { in: ["Compare Instant Loans"] }
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
  useEffect(() => {
    const hero = document.getElementById("hero")
    const handle = document.getElementById("handle")
    const header = document.getElementById("header")
    const dropdowns = document.getElementsByClassName("dropdown")
    if (!hero) {
      header.classList.add("bg-brand-purple")
      dropdowns[0].classList.add("bg-brand-purple")
    }
    var observer = new IntersectionObserver(
      entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting) {
          header.classList.remove("bg-brand-purple")
          dropdowns[0].classList.remove("secondary")
        } else {
          header.classList.add("bg-brand-purple")
          dropdowns[0].classList.add("secondary")
        }
      },
      {
        rootMargin: "-100px 0px 0px 0px",
      }
    )
    if (handle) {
      observer.observe(handle)
    }
    return () => {}
  }, [])

  return (
    <>
      <Global
        styles={css`
          body {
            padding-top: 80px;
          }
        `}
      ></Global>
      <div
        className=" fixed top-0 z-10 w-full  "
        id="header"
        css={css`
          transition: background-color 500ms;
        `}
      >
        <div
          className="container px-4 py-4 border-b"
          css={css`
            ${tw` border-white `}
            #header.bg-brand-purple & {
              ${tw` border-transparent `}
            }
          `}
        >
          <div className="flex justify-between items-center">
            <div>
              <Link to="/">
                {" "}
                <img
                  className=" w-full h-auto "
                  css={css`
                    max-width: 220px;
                    /* @lg */
                    @media (min-width: 1024px) {
                      max-width: 250px;
                    }
                  `}
                  src={logo}
                ></img>
              </Link>
            </div>
            <div className="navigation lg:flex hidden">
              <Links menu={menu}></Links>

              <Cta className="relative z-50 ml-8"></Cta>
            </div>
            <div className="lg:hidden">
              <FiMenu
                onClick={() => {
                  setMenuIsOpen(true)
                }}
                className="w-10 h-10 text-white"
              ></FiMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Links({ menu }) {
  return (
    <>
      <div className="group py-5 relative">
        <a className="uppercase text-white mr-6 tracking-wide cursor-pointer">
          Guides
        </a>
        <div
          css={css`
            left: -1rem;
            ${tw`bg-white text-brand-purple shadow  pt-4 mt-5`}
            &.secondary {
              ${tw`bg-brand-purple text-white `}
            }
          `}
          className="dropdown absolute    w-56     p-4 z-30   hidden group-hover:block"
        >
          {menu &&
            menu.nodes
              .filter(i => i.isThisAGuide)
              .map(item => {
                return (
                  <div className="py-2">
                    <Link
                      className="  mr-0 tracking-wide hover:text-brand-green"
                      key={item.slug}
                      to={
                        item.slug == "/"
                          ? "/"
                          : `/${item.slug}/`.replace("//", "/")
                      }
                    >
                      {item.navigationTitle}
                    </Link>
                  </div>
                )
              })}
        </div>
      </div>
      {menu &&
        menu.nodes
          .filter(i => !i.isThisAGuide)
          .map(item => {
            return (
              <div className="py-5">
                <Link
                  className="uppercase text-white mr-6  tracking-wide hover:text-brand-green"
                  key={item.slug}
                  to={
                    item.slug == "/" ? "/" : `/${item.slug}/`.replace("//", "/")
                  }
                >
                  {item.navigationTitle}
                </Link>
              </div>
            )
          })}
    </>
  )
}
