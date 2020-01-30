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
