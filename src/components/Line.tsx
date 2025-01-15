import { type Statement } from "./types"

type Props = {
  statement: Statement
  n: number
  t: number
}

export function Line({ statement, n, t }: Props) {
  return (
    <div className="flex w-full ">
      <textarea
        className={`w-32 resize-none bg-green-400 outline-none [field-sizing:content]`}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault()
            console.log("tab")
          } else if (e.key === "Enter") {
            e.preventDefault()
            console.log("enter")
          }
        }}
      ></textarea>
      {statement.responses.map((response) => (
        <div className="bg-blue-500 w-full"><Line statement={response} n={n + 1} t={t} /></div>
      ))}
    </div>
  )
}
