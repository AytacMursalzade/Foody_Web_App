import React, { useState, useEffect } from 'react';
import ProductItem from '../ProductItems/ProductItem/ProductItem';
import ProductItemsContainer from '../../../components/common/ProductItemsContainer/ProductsItemsContainer';
import axios from 'axios';

const ProductItems = () => {
    const [productsData, setProductsData] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProductsData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, []);

    return (
        <>
            <ProductItemsContainer>
                {productsData && <ProductItem productsData={productsData} />}
            </ProductItemsContainer>
        </>
    );
};

export default ProductItems;
