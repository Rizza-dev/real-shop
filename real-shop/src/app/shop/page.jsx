"use client";

import useProducts from "@/hooks/useProducts";
import { useFilterStore } from "@/store/useFilterStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ShopPage() {
  const setFilters = useFilterStore((s) => s.setFilters);
  const params = useSearchParams();
  const router = useRouter();
  const { products, loading } = useProducts();

  useEffect(() => {
    const filterObject = Object.fromEntries(params.entries());
    setFilters(filterObject);
  }, [params, setFilters]);

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

  if (loading) {
    return <div>Loading...</div>;
  }
  
  console.log(products);

  return (
    <div>
      <h1>Shop</h1>
      <select onChange={(e) => updateFilter("category", e.target.value)}>
        <option value={""}>all</option>
        <option value={"shoes"}>shoes</option>
        <option value={"bag"}>bag</option>
      </select>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

// import { useFilterStore } from "@/store/useFilterStore";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ShopPage({ searchParams }) {
//   const [product, setProduct] = useState([]);
//   const setFilters = useFilterStore((s) => s.setFilters);

//   // log product
//   console.log(product);

//   // تغییر فیلتر در یو آر ال نه استیت
//   const router = useRouter();
//   const params = useSearchParams();

//   // تابع آپدیت فیلتر

//   const updateFilter = (key, value) => {
//     const newParams = new URLSearchParams(params.toString());
//     if (!value) {
//       newParams.delete(key);
//     } else {
//       newParams.set(key, value);
//     }

//     router.push(`/shop?${newParams.toString()}`);
//   };

//   // Sync اولیه URL → Zustand
//   useEffect(() => {
//     setFilters(searchParams);
//   }, [searchParams, setFilters]);

//   // Fetch دیتا بر اساس URL
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/products?${params.toString()}`,
//         );
//         const data = await response.json();
//         setProduct(data.products);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [params]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <button
//           className="bg-white p-2 px-6 rounded cursor-pointer text-black "
//           onClick={() => updateFilter("category", "hoodie")}
//         >
//           هودی
//         </button>
//         <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//           {product?.map((item) => (
//             <div key={item._id}>
//               <p>{item.title}</p>
//             </div>
//           ))}
//         </h1>
//       </main>
//     </div>
//   );
// }
