import React, { useState } from "react"
import { Collapse } from "react-collapse"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { GoPlus, GoDash } from "react-icons/go"

export default function CommonQuestions({ data }) {
  return (
    <div className=" ">
      {" "}
      <div
        className="container py-24"
        css={css`
          .ReactCollapse--collapse {
            transition: height 300ms;
          }
        `}
      >
        <h3 className="text-center text-3xl  font-normal mb-24 mt-0">
          Commonly Asked Questions{" "}
        </h3>
        {data.map(qa => {
          return (
            <Question
              key={qa.question}
              question={qa.question}
              answer={qa.answer}
            ></Question>
          )
        })}
      </div>
    </div>
  )
}

function Question({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <h5
        className="font-normal flex items-center cursor-pointer mt-2 mb-1 leading-snug border border-black  text-brand-blue px-3 py-2"
        onClick={e => {
          setOpen(o => !o)
        }}
      >
        {question}
        {!open && (
          <span className="inline-block ml-auto border-black border p-1 rounded-full">
            <GoPlus className="w-4 h-4 text-black" />
          </span>
        )}
        {open && (
          <span className="inline-block ml-auto border-black border p-1 rounded-full">
            <GoDash className="w-4 h-4 text-black" />
          </span>
        )}
      </h5>
      <div className="lg:pl-4 pt-3 ">
        <Collapse isOpened={open}>
          <div
            css={css`
              padding-bottom: 1rem;
              p {
                margin-bottom: 0;
                padding-bottom: 1.5rem;
                &:last-of-type {
                  padding-bottom: 0;
                }
              }
            `}
            dangerouslySetInnerHTML={{ __html: answer.md.html }}
          ></div>
        </Collapse>
      </div>
    </div>
  )
}
