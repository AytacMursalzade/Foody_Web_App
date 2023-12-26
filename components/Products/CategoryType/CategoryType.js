'use client'
import React, { useEffect } from 'react'
import styles from '../CategoryType/categorytype.module.css'
import SelectBox from '../../common/Selectbox/Selectbox'
import axios from 'axios';

const CategoryType = ({ pageForm }) => {
  const getResForm = () => {

    const [responseData, setResponseData] = useState(null);
    useEffect (() => {
            const getResForm = async () => {
              try {
                const response = await axios.get("/api/restaurants", {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                });
          
                setResponseData(response.data);
              } catch (error) {
                console.log(error);
              }
            };
          
            getResForm();
    }, []);
    
    return (
      <>
        <div className={styles['category-type-bg']}>
          <div className='flex max-md:flex-col justify-between items-center py-5 px-7'>
            <div className='max-md:mb-4'>
              <h2 className={styles['products-head-text']}>{pageForm}</h2>
            </div>
            <div className='flex gap-10 items-center'>
              {(pageForm !== 'History' && pageForm !== 'Geçmiş' && pageForm !== 'Tarixçə') && <SelectBox categories={responseData} />}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CategoryType