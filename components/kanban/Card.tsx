// components/kanban/Card.tsx

'use client'
// client component because @dnd-kit's useSortable hook needs browser APIs (drag events, refs)

// TODO: import { useSortable } from '@dnd-kit/sortable'
// TODO: import { CSS } from '@dnd-kit/utilities'
// TODO: import Badge from '../ui/Badge'
// TODO: import type { Application } from '@/types'

// CONCEPT NOTE — @dnd-kit/sortable:
// useSortable(id) gives you back: attributes, listeners, setNodeRef, transform, transition, isDragging
// - setNodeRef: attach to the root DOM node so dnd-kit can measure/track it
// - attributes + listeners: spread onto the draggable element (usually the same root node) — these wire up the pointer/keyboard drag handlers
// - transform + transition: feed into a style object via CSS.Transform.toString(transform) — this is what actually animates the card while dragging
// - isDragging: boolean you can use to visually differentiate the card being dragged (e.g. lower opacity)
// The `id` you pass to useSortable must match the id used in the parent's <SortableContext items={[...]}> list — for this app, use application.id

// Props this component receives:
// - application: Application

const Card = () => {

  // TODO: destructure company, role, status, applied_at, follow_up_at, salary_min, salary_max from application prop

  // TODO: call useSortable, passing { id: application.id }
  //   - destructure attributes, listeners, setNodeRef, transform, transition, isDragging

  // TODO: build the style object for the root element
  //   - transform: CSS.Transform.toString(transform)
  //   - transition
  //   - hint: this has to be a real JS object passed to style={}, not Tailwind classes — dnd-kit positioning can't be expressed as static utility classes

  // TODO: determine if follow-up is overdue
  //   - hint: compare follow_up_at to today's date, only if follow_up_at exists (it's optional)
  //   - careful: comparing raw date strings works but comparing Date objects is safer — new Date(follow_up_at) < new Date()

  // TODO: build a display string for salary range
  //   - if both salary_min and salary_max exist, format as a range
  //   - if only one exists, show that one
  //   - if neither exists, don't render the salary line at all

  return (
    <div>
      {/* TODO: root element gets ref={setNodeRef}, style={style}, and spreads {...attributes} {...listeners} */}
      {/* card container: surface background, border, rounded corners, padding, shadow-sm */}
      {/* reduce opacity on this element when isDragging is true — gives drag feedback */}
      {/* add cursor-grab (and cursor-grabbing while dragging) so it reads as draggable */}

      {/* TODO: top row — company name (bold, primary text) and role (secondary text, smaller) stacked vertically */}

      {/* TODO: render <Badge> with the status value */}
      {/* Badge should already handle its own color mapping per status — just pass status through */}

      {/* TODO: if salary display string exists, render it — small, secondary text color */}

      {/* TODO: if follow_up_at exists, render the date */}
      {/*   - if overdue, style it with danger color + maybe a small warning icon/dot */}
      {/*   - if not overdue, secondary text color */}
    </div>
  )
}

export default Card