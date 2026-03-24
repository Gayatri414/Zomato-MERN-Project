import React from 'react'

import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'

function App() {


  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
/*
When a user interacts with the UI, an event handler function 
is triggered. This function may update the component state and 
make an API call using axios or fetch. The request is sent to the
 backend, and once the response is received, the state is updated.
  React then re-renders the UI automatically based on the updated state.
   This creates a smooth and dynamic user experience.
*/