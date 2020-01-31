import React from "react"
import Cta from "./Cta"
import { useStaticQuery, graphql, Link } from "gatsby"
import logo from "../images/logo.png"
import { GiHamburgerMenu } from "react-icons/gi"
import css from "@emotion/css"
export default function Header({ setMenuIsOpen }) {
  const { menu } = useStaticQuery(graphql`
    {
      menu: allContentfulPage(
        filter: {
          node_locale: { eq: "en-US" }
          website: { in: ["Compare No Guarantor Loans"] }
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
    <div className="shadow border-b border-brand-gray-bg  ">
      <div className="container px-3 py-4">
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
          <div className="navigation lg:flex items-center hidden">
            <Links menu={menu}></Links>
            <Cta className="z-50"></Cta>
          </div>
          <div className="lg:hidden">
            <GiHamburgerMenu
              onClick={() => {
                setMenuIsOpen(true)
              }}
              className="w-10 h-10 text-black"
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
      <div className="group py-5 relative">
        <a className="uppercase mr-6 tracking-wide cursor-pointer">Guides</a>
        <div
          css={css`
            left: -1rem;
          `}
          className="absolute   pt-12  w-56   p-4   bg-white hidden group-hover:block z-10"
        >
          {" "}
          {menu &&
            menu.nodes
              .filter(i => i.isThisAGuide)
              .map(item => {
                return (
                  <div className="py-2">
                    <Link
                      className=" mr-6 lg:mr-0 tracking-wide hover:text-brand-blue"
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
              <div className="py-2">
                <Link
                  className="uppercase mr-6  tracking-wide hover:text-brand-blue"
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
