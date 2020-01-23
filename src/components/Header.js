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
          <div className="navigation lg:block hidden">
            {menu &&
              menu.nodes.map(item => {
                return (
                  <Link
                    className="uppercase mr-6 tracking-wide "
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
