import { useReducer, useState } from "react"
import { Line } from "./Line"
import { type Statement } from "./types"
import { firstNull } from "../utilities"

export function Flow() {
  // Needed for some unknown, stupid reason
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const [statements, setStatements] = useState<Statement[]>([
    { content: "", children: [] },
  ])

  function updateContent(i: number, content: string) {
    setStatements((current) => {
      current[i].content = content
      return current
    })

    forceUpdate()
  }

  function createSibling(i: number) {
    let j

    setStatements((current) => {
      j = firstNull(current)

      const parent = current[i].parent

      current[j] = { content: "", parent: parent, children: [] }
      if (parent !== undefined)
        current[parent].children.splice(
          current[parent].children.indexOf(i) + 1,
          0,
          j,
        )

      console.log(current)

      return current
    })

    forceUpdate()
  }

  function createChild(i: number) {
    setStatements((current) => {
      const j = firstNull(current)

      current[j] = { content: "", parent: i, children: [] }
      current[i].children.push(j)

      return current
    })

    forceUpdate()
  }

  return (
    <>
      {Array.from(statements.keys())
        .filter((i) => statements[i].parent === undefined)
        .map((i) => (
          <Line
            statements={statements}
            root={i}
            speech={0}
            key={i}
            updateContent={updateContent}
            createSibling={createSibling}
            createChild={createChild}
          />
        ))}
    </>
  )
}
