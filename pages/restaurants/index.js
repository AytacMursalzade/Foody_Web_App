import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import Leftsidebar from "../../components/Clientrestaurants/leftsidebar";
import Rightsidebar from "../../components/Clientrestaurants/rightsidebar";
import ClientContainer from "../../components/common/ClientContainer/ClientContainer";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";




const index = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products" );

      return data;
    },
  });
  console.log(data);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <ClientContainer>
      <div className="flex gap-4 mt-4 mb-6">
        <Leftsidebar handleCategoryClick={handleCategoryClick} />
        {/* <Rightdetail /> */}
        <ToastContainer />
        <Rightsidebar categoryId={selectedCategoryId} />
      </div>
    </ClientContainer>
  );
};

export default index;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
