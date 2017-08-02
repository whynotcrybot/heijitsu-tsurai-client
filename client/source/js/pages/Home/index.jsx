import React from 'react'

import DefaultLayout from 'layouts/Default'
import Tasks from 'containers/Tasks'

const Home = () => {
  return (
    <DefaultLayout>
      <Tasks />
    </DefaultLayout>
  )
}

export default Home
