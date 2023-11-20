import React from "react";
import { openCategoryModalEdit } from "../../redux/features/editModalSlice";
import { openDelCatModal } from "../../redux/features/delModalSlice";
import editIcon from "../../assets/icons/editIcon.svg";
import trashIcon from "../../assets/icons/trashIcon.svg";
import Image from "next/image";

import styles from "./admincategory.module.css";
const CategoryItem = ({ categoryData }) => {

 
  const categoryResult = categoryData?.result;

 
  return categoryResult?.data?.map((category, i) => (
    <tr className={styles["table-row"]} key={i}>
      <td>
        <span className={styles["table-id"]}>{(category?.id).length > 4 && (category?.id).slice(0,4)}</span>
      </td>
      <td className="flex justify-center">
        <Image width="60" height="60" src={category.img_url} alt="food" />
      </td>
      <td>{category.name}</td>
      <td>{category.slug}</td>
      <td>
        <button
         
          className="mr-4"
        >
          <Image src={editIcon} alt="edit-icon" />
        </button>
        <button >
          <Image src={trashIcon} alt="trash-icon" />
        </button>
      </td>
    </tr>
  ));
};

export default CategoryItem;
