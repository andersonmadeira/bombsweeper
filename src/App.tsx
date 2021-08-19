import React from 'react'
import { Grid } from './components/Grid'

export const App: React.FC = () => {
  return <Grid lines={10} columns={10} mines={20} />
}
