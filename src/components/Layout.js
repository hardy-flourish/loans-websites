import React from "react"
import Header from "./Header"
import SideMenu from "./SideMenu"
import Reviews from "./Reviews"
import Footer from "./Footer"

export default function Layout({ children }) {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <SideMenu {...{ menuIsOpen, setMenuIsOpen }}></SideMenu>
      <Header {...{ menuIsOpen, setMenuIsOpen }}></Header>
      {children}
      <Reviews></Reviews>
      <Footer></Footer>
    </div>
  )
}
