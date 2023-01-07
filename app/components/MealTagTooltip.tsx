import { MealTags } from '@prisma/client'
import { Tooltip } from 'react-tooltip'
import { formatMealTag, mapMealTagToEmoji } from '~/utils'
// import react and react-dom
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-tooltip/dist/react-tooltip.css'

export default function MealTagTooltip({ tag, id }: { tag: MealTags, id: string }) {
  return (
    <>
      <div id={id}>
        {mapMealTagToEmoji[tag]}
      </div>
      <Tooltip
        place="top"
        anchorId={id}
        content={formatMealTag[tag]}
      />

      {/* <a id="props-basic"> ◕‿‿◕ </a>

      <Tooltip anchorId="props-basic" content="hello world!" /> */}
    </>
  )
}