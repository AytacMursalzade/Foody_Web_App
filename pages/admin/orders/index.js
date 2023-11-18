import React from 'react'
import AdminDashboard from '../index'
import ProductContainer from '../../../components/Products/ProductsContainer'
import { useQuery } from "@tanstack/react-query";
import AdminOrders from '../../../components/AdminOrders/AdminOrders'
import DelModal from '../../../components/common/DelModal/DelModal'
import ShowOrderModal from '../../../components/ShowOrderModal/ShowOrderModal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import OrderType from '../../../components/common/Order/OrderType'
import axios from "axios";

const index = () => {
    const { t } = useTranslation('common')
    const { data, isLoading, error } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
          const accessToken = localStorage.getItem("access_token");
    
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          };
          const { data } = await axios.get("/api/order",{headers});
          return data;
        },
      });
    return (
        <>
            <AdminDashboard>
                <ProductContainer>
                   <OrderType pageName={"Orders"}/>
                    <AdminOrders  orderData={...data} isLoading={isLoading} error={error} />
                    <ShowOrderModal  orderData={...data} />
                    <DelModal />
                </ProductContainer>
            </AdminDashboard>
        </>
    )
}

export default index

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }

});