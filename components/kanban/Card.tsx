// components/kanban/Card.tsx

'use client'

import { useSortable } from '@dnd-kit/react/sortable'
import Badge from '../ui/Badge'
import type { Application } from '@/types'

const Card = ({application, index}: {application: Application, index: number}) => {
const {company, role, status, applied_at, follow_up_at, salary_max, salary_min} = application;
const {ref, isDragging} = useSortable({id:application.id, index})

let isOverdue = false; 
if(follow_up_at){
  isOverdue = new Date(follow_up_at) < new Date()
}
let salaryString = "";

if(salary_max && salary_min){
  salaryString = `$${salary_min.toLocaleString()} - $${salary_max.toLocaleString()}`;
} else if (salary_max){
  salaryString = `$${salary_max.toLocaleString()}`
} else if (salary_min){
  salaryString = `$${salary_min.toLocaleString()}`
}
return (
  <div ref={ref} className={ `bg-surface border rounded-2xl p-2 shadow-sm cursor-grab ${isDragging && "opacity-50"}`/* surface bg, border, rounded corners, padding, shadow-sm, cursor-grab — reduce opacity when isDragging */} >
    
    <div className={/* flex column, small gap between company and role */}>
      <p className={/* bold, primary text color */}>{company}</p>
      <p className={/* smaller, secondary text color */}>{role}</p>
    </div>

    <Badge status={status} />

    {salaryString && (
      <p className={/* small text, secondary color */}>{salaryString}</p>
    )}

    {follow_up_at && (
      <p className={isOverdue ? /* danger color */ : /* secondary color */}>
        {/* format follow_up_at as a readable date here — look at date-fns or Intl.DateTimeFormat */}
        {follow_up_at}
      </p>
    )}

  </div>
)
}

export default Card