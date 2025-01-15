import type { Statement } from "./types"

type Props = {
  statements: Statement[]
  root: number
  speech: number
  updateContent: (i: number, content: string) => void
  createSibling: (i: number) => void
  createChild: (i: number) => void
}

export function Line({
  statements,
  root,
  speech,
  updateContent,
  createSibling,
  createChild,
}: Props) {
  return (
    <div className="flex w-full">
      <textarea
        autoFocus
        className={`m-0.5 resize-none border border-black p-1 outline-none [field-sizing:content] ${speech % 2 ? "bg-blue-300" : "bg-red-300"}`}
        style={{ width: `${100 / (8 - speech)}%` }}
        value={statements[root].content}
        spellCheck={false}
        onChange={(e) => updateContent(root, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            createSibling(root)
          } else if (e.key === "Tab") {
            e.preventDefault()
            if (speech < 7) createChild(root)
          }
        }}
      />
      {statements[root].children.length > 0 && (
        <div
          className="flex flex-col"
          style={{ width: `${100 - 100 / (8 - speech)}%` }}
        >
          {statements[root].children.map((i) => (
            <Line
              statements={statements}
              root={i}
              speech={speech + 1}
              key={i}
              updateContent={updateContent}
              createSibling={createSibling}
              createChild={createChild}
            />
          ))}
        </div>
      )}
    </div>
  )
}
