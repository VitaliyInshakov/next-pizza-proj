import { cn } from "@/lib/utils";
import React from "react";

const CATEGORIES_LIST = [
  "Pizza",
  "Combo",
  "Snacks",
  "Cocktails",
  "Coffee",
  "Drinks",
  "Desserts",
];
const ACTIVE_INDEX = 0;

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {CATEGORIES_LIST.map((item, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            ACTIVE_INDEX === index &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
        >
          <button>{item}</button>
        </a>
      ))}
    </div>
  );
};
