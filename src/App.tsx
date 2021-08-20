import React from 'react'
import { Grid } from './components'

export const App: React.FC = () => {
  return <Grid lines={10} columns={10} mines={5} />
}

// easy: 10, 10: 5
// normal: 10, 10, 10
// hard: 12, 12, 30
