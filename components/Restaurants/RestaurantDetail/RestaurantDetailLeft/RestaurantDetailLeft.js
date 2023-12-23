import Image from "next/image";
import React from "react";
import styles from "./restaurantdetailleft.module.css";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const RestaurantDetailLeft = ({ id }) => {
  const { t } = useTranslation("common");

  const getProductsForm = () => {
    axios
      .get("/api/products")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log(data);

  const postProductForm = (addProductItem) => {
    axios
      .post("/api/basket/add", addProductItem ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };



  const router = useRouter();
  const increaseProducts = (productId) => {
    if (localStorage.getItem("access_token")) {
      addProductItem(productId);
    } else {
      router.push("/login");
    }
  };

  const datatoProduct = data?.result?.data;
  const appProducts = datatoProduct?.filter((item) => item.rest_id === id);
  return (
    <>
      <ToastContainer autoClose={8000} />
      <div className={styles["products-bg"]}>
        <div className={styles["products-text"]}>
          <h2>{t("Products")}</h2>
        </div>
        {appProducts?.map((item) => {
          return (
            <div className={styles["product-card"]} key={item.id}>
              <div className="flex">
                <div className="lg:mr-9">
                  <Image
                    className={styles.img}
                    width={100}
                    height={100}
                    src={item?.img_url}
                    alt="food"
                  />
                </div>
                <div className={styles["detail-title"]}>
                  <h3>{item?.name}</h3>
                  <span>
                    {(item?.description).length > 68
                      ? (item?.description).slice(0, 68) + "..."
                      : item?.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className={styles.from}>
                  From <span className={styles.price}>${item?.price}</span>
                </span>
                <button
                  className={styles["plus-btn"]}
                  onClick={() => increaseProducts(item?.id)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantDetailLeft;
