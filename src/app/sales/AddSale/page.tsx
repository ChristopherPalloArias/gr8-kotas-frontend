"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddSale() {
  const [date, setDate] = useState('');
  const [productId, setProductId] = useState('');
  const [clientId, setClientId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dmerkzjfj3.execute-api.us-east-2.amazonaws.com/products/');
        setProducts(response.data);
      } catch (error) {
        toast.error('Error fetching products');
        console.error('Error fetching products:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8095/clients');
        setClients(response.data);
      } catch (error) {
        toast.error('Error fetching clients');
        console.error('Error fetching clients:', error);
      }
    };

    fetchProducts();
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://8c5p0l1dyi.execute-api.us-east-2.amazonaws.com/sales/', {
        date,
        productId,
        clientId,
        quantity,
      });
      if (response.status === 201) {
        toast.success('Sale created successfully');
        setDate('');
        setProductId('');
        setClientId('');
        setQuantity(0);
      }
    } catch (error) {
      toast.error('Error creating sale');
      console.error('Error creating sale:', error);
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Sale</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Product:</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="p-2 border rounded"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Client:</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="p-2 border rounded"
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.ci} value={client.ci}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Sale
        </button>
      </form>
    </main>
  );
}
