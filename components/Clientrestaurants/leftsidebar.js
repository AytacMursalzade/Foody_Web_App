import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./leftsidebar.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Leftres({ handleCategoryClick }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axios.get("/api/category");
      return data;
    },
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const resultData = data?.result?.data;
  return (
    <div className={styles.leftresdiv} data-aos="fade-right">
      {resultData?.map((category) => {
        return (
          <div
            key={category?.id}
            onClick={() => handleCategoryClick(category?.id)}
          >
            <div className={styles["res-category"]}>
              <Image width={30} height={30} alt="img" src={category?.img_url}></Image>
              {category?.name.slice(0,12)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Leftres;
