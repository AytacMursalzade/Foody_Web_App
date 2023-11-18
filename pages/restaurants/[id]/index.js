"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import ClientContainer from "../../../components/common/ClientContainer/ClientContainer";
import papaJohns from "../../../assets/images/papaJohns.png";
import styles from "./restaurantdetail.module.css";
import RestaurantDetailLeft from "../../../components/Restaurants/RestaurantDetail/RestaurantDetailLeft/RestaurantDetailLeft";
import RestaurantDetailRight from "../../../components/Restaurants/RestaurantDetail/RestaurantDetailRight/RestaurantDetailRight";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const index = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t } = useTranslation("common");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/restuarants/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessJWT")}`,
        },
      });
      return data;
    },
  });
  const resultData = data?.result?.data;
  const singleRestItem = resultData?.filter((item) => item.id === id);

  return (
    <>
      <ClientContainer>
        <section className="mb-56">
          {singleRestItem?.map((item) => {
            return (
              <div className="relative mb-10" key={item?.id}>
                <div className={styles.bg} style={{ backgroundImage: `url(${item?.img_url})` }}>
                  {" "}
                  {/* <Image
                    src={item?.img_url}
                    width={100}
                    height={100}
                    alt="papa-johns"
                  /> */}
                </div>
                <div className="absolute bottom-0 flex justify-between items-center w-full">
                  <div className={styles["restaurant-title"]}>
                    <h2>
                      {item?.name}
                      {t("Restaurant")}
                    </h2>
                    <span>{item?.address}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={styles["restaurant-item"]}>
                      <h3>{t("Cuisine")}</h3>
                      <span>{item?.cuisine}</span>
                    </div>
                    <div className={styles["restaurant-buttons"]}>
                      <button>
                        ${item?.delivery_price} {t("Delivery")}
                      </button>
                      <button  onClick={() => router.push('/restaurants')}>{t("Go Back")}</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between gap-5">
          
            <RestaurantDetailLeft id={id} singleRestItem={singleRestItem} />
            <RestaurantDetailRight singleRestItem={singleRestItem} />
          </div>
        </section>
      </ClientContainer>
    </>
  );
};

export default index;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
