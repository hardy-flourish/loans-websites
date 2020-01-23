import React, { useEffect } from "react"
import Cta from "./Cta"
import { useStaticQuery, graphql, Link } from "gatsby"
import logo from "../images/logo.png"
import { FiMenu } from "react-icons/fi"
import css from "@emotion/css"
import { Global } from "@emotion/core"
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
          navigationTitle
        }
      }
    }
  `)
  useEffect(() => {
    const hero = document.getElementById("hero")
    const handle = document.getElementById("handle")
    const header = document.getElementById("header")
    if (!hero) {
      header.classList.add("bg-brand-purple")
    }
    var observer = new IntersectionObserver(
      entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting) {
          header.classList.remove("bg-brand-purple")
        } else {
          header.classList.add("bg-brand-purple")
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
            padding-top: 100px;
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
        <div className="container py-4 border-b border-white ">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/">
                {" "}
                <img
                  className=" w-full h-auto "
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
            <div className="navigation lg:block hidden">
              {menu &&
                menu.nodes.map(item => {
                  return (
                    <Link
                      className=" mr-6 tracking-wide text-white"
                      key={item.slug}
                      to={
                        item.slug == "/"
                          ? "/"
                          : `/${item.slug}/`.replace("//", "/")
                      }
                    >
                      {item.navigationTitle}
                    </Link>
                  )
                })}
              <Cta></Cta>
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
