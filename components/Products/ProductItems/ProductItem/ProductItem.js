import React, { useState } from 'react'
import styles from '../../../Products/ProductItems/ProductItem/productitem.module.css'
import editImg from '../../../../assets/icons/edit.svg';
import trashImg from '../../../../assets/icons/trash.svg';

import { motion } from "framer-motion";
import Image from 'next/image';

import { useEffect } from 'react';

const ProductItem = ({ productsData }) => {
    

    useEffect(() => {
        router.push(`/admin/products`)
    },[])

   

    const handleProdutData = () => {
        if (selActiveProductCategory) {
            const filteredProducts = data?.filter((product) => product.rest_id === selActiveProductCategory.id)
            return filteredProducts?.map((product) => (
                <motion.div
                    key={product?.id}
                    className={styles["product-bg"]}
                    variants={item}
                >
                    <div className={styles['product-detail']}>
                        <div>
                            {product?.img_url && <Image src={product.img_url} className='px-2 object-cover w-[160px] h-[160px]' width={160} height={160} alt='pizza' />}
                        </div>
                        <h3>{product?.name}</h3>
                        <span>Papa John's</span>
                        <div className={styles['product-price']}>
                            <div>
                                <span>${product?.price}</span>
                            </div>
                            <div className={styles['product-edit']}>
                                <button >
                                    <Image src={editImg} alt='edit' />
                                </button>
                                <button >
                                    <Image src={trashImg} alt='trash' />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))
        } else {
            return data?.map((product, i) => (
                <motion.div
                    key={product?.id}
                    className={styles["product-bg"]}
                    variants={item}
                >
                    <div className={styles['product-detail']}>
                        <div>
                            {product?.img_url && <Image src={product.img_url} className='px-2 object-cover w-[160px] h-[160px]' width={160} height={160} alt='pizza' />}
                        </div>
                        <h3>{(product?.name).length > 14 ? (product?.name).slice(0, 14) + "..." : product?.name}</h3>
                        <span>{handleRestName(product?.rest_id)}</span>
                        <div className={styles['product-price']}>
                            <div>
                                <span>${product?.price}</span>
                            </div>
                            <div className={styles['product-edit']}>
                                <button >
                                    <Image src={editImg} alt='edit' />
                                </button>
                                <button >
                                    <Image src={trashImg} alt='trash' />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))
        }

    }

    return (
        <>
           
        </>
    )
}

export default ProductItem