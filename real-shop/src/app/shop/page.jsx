"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShopPage({ searchParams }) {
  const [product, setProduct] = useState([]);
  const setFilters = useFilterStore((s) => s.setFilters);

  // log product
  console.log(product);

  // تغییر فیلتر در یو آر ال نه استیت
  const router = useRouter();
  const params = useSearchParams();

  // تابع آپدیت فیلتر

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(params.toString());
    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`/shop?${newParams.toString()}`);
  };

  // Sync اولیه URL → Zustand
  useEffect(() => {
    setFilters(searchParams);
  }, [searchParams, setFilters]);

  // fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProduct(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button className="bg-white p-2 px-6 rounded cursor-pointer text-black " onClick={()=>updateFilter("category" , "hoodie")}>هودی</button>
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {product?.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
            </div>
          ))}
        </h1>
      </main>
    </div>
  );
}
