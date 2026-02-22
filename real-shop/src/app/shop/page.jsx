"use client"

import { useEffect, useState } from "react"

export default function ShopPage(){
  const [product,setProduct] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProduct(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }

    fetchData();
  },[])

  console.log(product);
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {
            product?.map((item) => (
              <div key={item._id}>
                <p>{item.title}</p>
              </div>
            ))
          }
        </h1>
      </main>
    </div>
  )
}