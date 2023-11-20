import Image from "next/image";
import React from "react";
import styles from "./restaurantdetailleft.module.css";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const RestaurantDetailLeft = ({id }) => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
 
  return (
    <>
    <ToastContainer autoClose={8000} />
      <div className={styles["products-bg"]}>
        <div className={styles["products-text"]}>
          <h2>{t("Products")}</h2>
        </div>
        {restaurantProducts?.map((item) => {
          return (
            <div className={styles["product-card"]} key={item.id}>
              <div className="flex">
                <div className="mr-9">
                  <Image
                    width={100}
                    height={100}
                    src={item?.img_url}
                    alt="food"
                  />
                </div>
                <div className={styles["detail-title"]}>
                  <h3>{item?.name}</h3>
                  <span>{item?.description}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className={styles.from}>
                  From <span className={styles.price}>${item?.price}</span>
                </span>
                <button className={styles["plus-btn"]} onClick={()=>increaseProductCount(item?.id)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantDetailLeft;
