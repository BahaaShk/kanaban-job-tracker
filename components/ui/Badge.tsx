// components/ui/Badge.tsx

// CONCEPT NOTE — What is this component?
//
// Badge is a small, reusable label used to show an application's status
// (e.g. "Applied", "Interview") as a colored pill. You'll use this inside
// the kanban Card component later, and possibly elsewhere (detail page).
//
// It needs to map a status string to a specific color — 'offer' should look
// different from 'rejected', for example. This means the component needs
// some internal logic to decide which color classes to apply based on
// the status it receives.

// TODO: import the Status type from '@/types'
import { cn } from "@/lib/utils"
import { Status } from "@/types"
// TODO: define a Props type
//   - status: Status
type Props = {
  status: Status
}
// CONCEPT NOTE — mapping a value to styles
//
// You'll need a way to go from a status string to a specific set of
// Tailwind classes (background + text color). Think about how you'd
// structure this — a few options to consider:
//   - an object that maps each Status to a className string
//   - a switch statement that returns a className per case
//   - an if/else chain
// Pick whichever feels cleanest to you. An object map is usually the
// most scalable if you're comfortable with that pattern; a switch is
// more explicit if you're not yet.

const Badge = (props : Props) => {

  const { status } = props

  const statusStyles = {
  wishlist: "bg-muted/20 text-muted",
  applied: "bg-accent/20 text-accent",
  interview: "bg-warning/20 text-warning",
  offer: "bg-success/20 text-success",
  rejected: "bg-danger/20 text-danger"
}


  // TODO: figure out which color classes apply for this status
  //   - wishlist: muted/neutral colors
  //   - applied: accent colors
  //   - interview: warning colors
  //   - offer: success colors
  //   - rejected: danger colors
  //   hint: for each, you'll set a background and a text color —
  //   look at how your color tokens are named in globals.css
  //   (e.g. there's a "success" token — is there also a way to apply
  //   it as a background with reduced opacity, for a softer pill look?
  //   Tailwind supports opacity modifiers on background utilities —
  //   look up the `/` syntax, e.g. bg-color/20)

  return (
    <span>
      {/* TODO: render the status text inside the span */}
      <span className= {cn()}>{status}</span>
      {/* TODO: apply the color classes you determined above */}
      {/* TODO: style as a pill:
            - small text size
            - some horizontal and vertical padding (padding should feel
              tight — this is a small label, not a button)
            - rounded corners — fully rounded (think "pill" shape, not
              just slightly rounded corners)
            - font weight slightly bolder than normal text */}
    </span>
  )
}

export default Badge
