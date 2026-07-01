// components/kanban/Card.tsx

'use client'
// client component — useSortable needs browser drag events, refs

import { useSortable } from '@dnd-kit/react/sortable'
import Badge from '../ui/Badge'
import type { Application } from '@/types'

// CONCEPT NOTE — @dnd-kit/react (new API):
// useSortable({ id, index }) returns { ref, isDragging } — that's it.
// - ref: attach directly to the root DOM node, dnd-kit handles positioning internally
// - isDragging: boolean for visual feedback
// No transform/transition to wire up manually, no CSS.Transform.toString(), no
// spreading {...attributes} {...listeners} — the ref alone makes the element draggable.
// `id` must match the id used in the parent's sortable group (application.id).
// `index` is the item's current position in its column array — Column.tsx will pass this down.

// Props this component receives:
// - application: Application
// - index: number (position within its column — required by useSortable)

const Card = () => {

  // TODO: destructure company, role, status, applied_at, follow_up_at, salary_min, salary_max from application prop

  // TODO: call useSortable, passing { id: application.id, index }
  //   - destructure ref, isDragging

  // TODO: determine if follow-up is overdue
  //   - only check if follow_up_at exists (it's optional)
  //   - compare as Date objects: new Date(follow_up_at) < new Date()

  // TODO: build a display string for salary range
  //   - if both salary_min and salary_max exist, format as a range
  //   - if only one exists, show that one
  //   - if neither exists, don't render the salary line at all

  return (
    <div>
      {/* TODO: root element gets ref={ref} — no style prop needed, no spread props */}
      {/* card container: surface background, border, rounded corners, padding, shadow-sm */}
      {/* reduce opacity on this element when isDragging is true */}
      {/* add cursor-grab so it reads as draggable */}

      {/* TODO: top row — company name (bold, primary text) and role (secondary text, smaller) stacked vertically */}

      {/* TODO: render <Badge> with the status value */}

      {/* TODO: if salary display string exists, render it — small, secondary text color */}

      {/* TODO: if follow_up_at exists, render the date */}
      {/*   - if overdue, danger color + small warning indicator */}
      {/*   - if not overdue, secondary text color */}
    </div>
  )
}

export default Card