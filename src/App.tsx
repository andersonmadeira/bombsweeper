import React from 'react'
import { Grid } from './components'

export const App: React.FC = () => {
  return <Grid lines={12} columns={12} mines={20} />
}
