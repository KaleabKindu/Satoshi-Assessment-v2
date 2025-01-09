import React from 'react'
import { withRootLayout } from '../hoc/withRootLayout'
import { useGetProjects } from '../hooks/api'


const Projects = () => {
  const { data:projects } = useGetProjects()
  console.log("projects", projects)

  return (
    <div>Projects</div>
  )
}

export default withRootLayout(Projects)