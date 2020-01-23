import React from "react"
import css from "@emotion/css"
import tw from "tailwind.macro"
export default function CommonQuestions({ data }) {
  return (
    <div
      className="bg-brand-gray-bg text-brand-gray-light flex-grow"
      css={css`
        h2 {
          ${tw`text-2xl mt-8 `}
          &:first-of-type {
            ${tw`mt-0`}
          }
        }
        div > *:last-child {
          ${tw`mb-0`}
        }
      `}
    >
      {" "}
      <div
        className="container py-24"
        dangerouslySetInnerHTML={{ __html: data.main.md.html }}
      ></div>
    </div>
  )
}
