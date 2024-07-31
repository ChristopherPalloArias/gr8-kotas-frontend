"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Sale {
  saleId: string;
  date: string;
  productId: string;
  clientId: string;
  quantity: number;
}

const SaleList: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("https://8c5p0l1dyi.execute-api.us-east-2.amazonaws.com/sales/");
        setSales(response.data);
      } catch (error) {
        toast.error("Error fetching sales");
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr>
            <th className="w-1/5 py-2 px-4 border-b">Sale ID</th>
            <th className="w-1/5 py-2 px-4 border-b">Date</th>
            <th className="w-1/5 py-2 px-4 border-b">Product ID</th>
            <th className="w-1/5 py-2 px-4 border-b">Client ID</th>
            <th className="w-1/5 py-2 px-4 border-b">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.saleId}>
              <td className="w-1/5 py-2 px-4 border-b text-center">{sale.saleId}</td>
              <td className="w-1/5 py-2 px-4 border-b text-center">{sale.date}</td>
              <td className="w-1/5 py-2 px-4 border-b text-center">{sale.productId}</td>
              <td className="w-1/5 py-2 px-4 border-b text-center">{sale.clientId}</td>
              <td className="w-1/5 py-2 px-4 border-b text-center">{sale.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default SaleList;
