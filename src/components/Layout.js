import React from "react"
import Header from "./Header"
import SideMenu from "./SideMenu"
import Reviews from "./Reviews"
import Footer from "./Footer"
import Cta from "./Cta"
import { useStaticQuery, graphql } from "gatsby"
import CookieConsent from "react-cookie-consent"
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
          <div className="bg-brand-gray-bg">
            <div className="container text-center pb-16 -mt-8">
              <Cta className="h-20 px-12"></Cta>
            </div>
          </div>{" "}
          <Reviews></Reviews>
          <Footer></Footer>
          <CookieConsent
            style={{ alignItems: "center" }}
            buttonText="Accept"
            buttonStyle={{ color: "#fff", background: "#0bde97" }}
            enableDeclineButton={false}
            flipButtons
          >
            <div
              css={css`
                a {
                  text-decoration: underline;
                  color: #0bde97;
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
