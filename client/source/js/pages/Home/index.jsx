import React from 'react'

import DefaultLayout from 'layouts/Default'
import AddBlueprint from 'components/AddBlueprint'
import Tasks from 'containers/Tasks'

const Home = () => {
  return (
    <DefaultLayout>
      <AddBlueprint />
      <Tasks />
    </DefaultLayout>
  )
}

export default Home
