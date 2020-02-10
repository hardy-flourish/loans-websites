import React from "react"
import { Link } from "gatsby"

export default function Cta({ className, amount = 2000, term = 12 }) {
  return (
    <a
      href="/apply/"
      state={{ amount, term }}
      className={
        "text-white inline-flex items-center justify-center bg-brand-blue  inline-block tracking-wide  p-2 w-48 h-12 rounded-full " +
        className
      }
    >
      {" "}
      Get Started
    </a>
  )
}
