import React from "react"
import Header from "./Header"
import SideMenu from "./SideMenu"
import Reviews from "./Reviews"
import Footer from "./Footer"
import Cta from "./Cta"
export default function Layout({ children }) {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <SideMenu {...{ menuIsOpen, setMenuIsOpen }}></SideMenu>
      <Header {...{ menuIsOpen, setMenuIsOpen }}></Header>
      {children}
      <div className="bg-brand-gray-bg">
        <div className="container text-center pb-16 -mt-8">
          <Cta className="h-20 px-12"></Cta>
        </div>
      </div>
      <Reviews></Reviews>
      <Footer></Footer>
    </div>
  )
}
