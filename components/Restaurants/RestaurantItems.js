import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Image from 'next/image'
import eaImage from '../../assets/images/ea-image.svg'
import { BounceLoader } from 'react-spinners'
import RestaurantItem from './RestaurantItem/RestaurantItem'
import RestaurantItemsContainer from './RestaurantItemsContainer.js/RestaurantItemsContainer'

const RestaurantItems = () => {

 

  return (
    <>
      <RestaurantItemsContainer>
        <RestaurantItem restaurantsData={...data} />
      </RestaurantItemsContainer>
    </>
  )
}

export default RestaurantItems