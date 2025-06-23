import { Projects } from '@/state/api'
import React from 'react'

type Props = {
    project: Projects,
}

function ProjectCard({ project }: Props) {
  return (
    <div className='rounded border p-4 shadow'>
        <h3>{project.name}</h3>
        <p>Description: {project.description}</p>
        <p>Started at:{project.startDate}</p>
        <p>Due till: {project.endDate}</p>
    </div>
  )
}

export default ProjectCard