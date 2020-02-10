import React from "react"
import Header from "./Header"
import SideMenu from "./SideMenu"
import Reviews from "./Reviews"
import Footer from "./Footer"
import Cta from "./Cta"
import CookieConsent from "react-cookie-consent"
import { useStaticQuery, graphql } from "gatsby"
import css from "@emotion/css"
export default function Layout({ children, formPage }) {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const { cookies } = useStaticQuery(graphql`
    {
      cookies: contentfulCookiePopup(
        websites: { in: ["Compare Guarantor Loans"] }
      ) {
        text {
          md: childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  return (
    <div className="min-h-screen flex flex-col">
      <SideMenu {...{ menuIsOpen, setMenuIsOpen }}></SideMenu>
      <Header {...{ menuIsOpen, setMenuIsOpen }}></Header>
      {children}
      {!formPage && (
        <>
          <div className="container text-center pb-16 -mt-8">
            <Cta className="w-64 h-16 px-12" />
          </div>
          <Reviews></Reviews>
          <Footer></Footer>
          <CookieConsent
            style={{ alignItems: "center" }}
            buttonText="Accept"
            buttonStyle={{ color: "#000", background: "#fff" }}
            enableDeclineButton={false}
            flipButtons
          >
            <div
              css={css`
                a {
                  text-decoration: underline;
                  color: #fff;
                }
                p {
                  margin-bottom: 0;
                }
              `}
              dangerouslySetInnerHTML={{
                __html: cookies && cookies.text.md.html,
              }}
            ></div>
          </CookieConsent>
        </>
      )}
    </div>
  )
}
