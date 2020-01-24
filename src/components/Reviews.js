import React from "react"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { IoMdStar } from "react-icons/io"
import { MdStars } from "react-icons/md"
export default function Reviews() {
  return (
    <div
      className="shadow text-center"
      css={css`
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.13);
      `}
    >
      <div
        className="container py-8 text"
        css={css`
          font-family: sans-serif;
          strong {
            ${tw`text-lg`}
          }
        `}
      >
        Our customers say <strong>Excellant</strong>
        <div
          className="inline-flex relative items-cente mx-2"
          css={css`
            top: 4px;
          `}
        >
          {" "}
          {Array.from({ length: 5 }).map((_, i) => (
            <IoMdStar
              key={i}
              className="text-brand-orange w-6 h-6 inline-block "
            ></IoMdStar>
          ))}
        </div>
        <strong>5.00</strong> out of 5 based on <strong>4</strong> reviews{" "}
        <MdStars
          className="inline-block w-6 h-6 mr-1 text-brand-green relative"
          css={css`
            top: -2px;
          `}
        />
        REVIEWS
      </div>
    </div>
  )
}
