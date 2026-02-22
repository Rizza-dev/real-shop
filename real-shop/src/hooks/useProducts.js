"use client";

import { useFilterStore } from "@/store/useFilterStore";
import { useEffect, useState } from "react";

export default function useProducts() {
  const filters = useFilterStore((s) => s.filters);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const query = new URLSearchParams(filters).toString();

      const res = await fetch(`http://localhost:3000/api/products?${query}`);
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, [filters]);

  return { products, loading };
}
