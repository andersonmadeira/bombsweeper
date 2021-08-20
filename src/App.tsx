import React from 'react'

import { Grid } from './components'
import { PageWrapper } from './styles'

export const App: React.FC = () => {
  return (
    <PageWrapper>
      <Grid lines={10} columns={10} mines={5} />
    </PageWrapper>
  )
}

// easy: 10, 10: 5
// normal: 10, 10, 10
// hard: 12, 12, 30
