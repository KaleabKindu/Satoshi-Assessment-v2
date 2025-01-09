import React from 'react'
import { withRootLayout } from '../hoc/withRootLayout'
import { useGetProjectById } from '../hooks/api'
import { useParams } from 'react-router-dom'
import ProjectDetail from '../components/ProjectDetail'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import ToggleFavouriteButton from '../components/ToggleFavouriteButton'

const Project = () => {
  const { id } = useParams()
  const { data: project, isLoading } = useGetProjectById(id)
  return (
    <>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className='flex flex-col-reverse lg:flex-row items-start gap-3 lg:gap-0 max-w-[80%] mx-auto'>

          <ProjectDetail project={project}/>
          <ToggleFavouriteButton id={project.id} isFavourite={project.favourite} />
        </div>
      )}
    </>  )
}

export default withRootLayout(Project)