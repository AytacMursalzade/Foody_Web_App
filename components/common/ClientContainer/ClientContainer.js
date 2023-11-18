import React from 'react'
import ClientFooter from '../ClientFooter/ClientFooter'
import ClientHeader from '../ClientHeader/ClientHeader'

const ClientContainer = ({ children }) => {

  return (
    <div className='layout-client'>
      <div className='mx-6'>
        <ClientHeader />
        {children}
      </div>
      <ClientFooter />
    </div>
  )
}

export default ClientContainer

