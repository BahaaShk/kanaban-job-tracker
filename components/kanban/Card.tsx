// components/kanban/Card.tsx

'use client'

import { useSortable } from '@dnd-kit/react/sortable'
import Badge from '../ui/Badge'
import type { Application } from '@/types'
import { formatDate, isOverdue } from '@/lib/utils'

const Card = ({application, index}: {application: Application, index: number}) => {
const {company, role, status, applied_at, follow_up_at, salary_max, salary_min} = application;
const {ref, isDragging} = useSortable({id:application.id, index})

let salaryString = "";

if(salary_max && salary_min){
  salaryString = `$${salary_min.toLocaleString()} - $${salary_max.toLocaleString()}`;
} else if (salary_max){
  salaryString = `$${salary_max.toLocaleString()}`
} else if (salary_min){
  salaryString = `$${salary_min.toLocaleString()}`
}
return (
  <div ref={ref} className={ `bg-surface border rounded-2xl p-2 shadow-sm cursor-grab ${isDragging ? "opacity-50" : ""}`/* surface bg, border, rounded corners, padding, shadow-sm, cursor-grab — reduce opacity when isDragging */} >
    
    <div className={/* flex column, small gap between company and role */ "flex flex-col gap-3"}>
      <p className={/* bold, primary text color */"font-bold text-text-primary"}>{company}</p>
      <p className={/* smaller, secondary text color */ "text-sm text-text-secondary"}>{role}</p>
    </div>

    <Badge status={status} />

    {salaryString && (
      <p className={/* small text, secondary color */"text-sm text-text-secondary"}>{salaryString}</p>
    )}

    {follow_up_at && (
      <p className={`${isOverdue(follow_up_at) ? "text-danger" : "text-text-secondary"}`}>
        {formatDate(follow_up_at)}
      </p>
    )}

  </div>
)
}

export default Card
