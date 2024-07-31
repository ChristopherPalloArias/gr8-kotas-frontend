"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0); // Nuevo estado para cantidad
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://rk1gux15jd.execute-api.us-east-2.amazonaws.com/categories');
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      } catch (error) {
        toast.error('Error fetching categories');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dmerkzjfj3.execute-api.us-east-2.amazonaws.com/products', {
        name,
        category,
        quantity, // Incluimos cantidad en la solicitud
      });
      if (response.status === 201) {
        toast.success('Product created successfully');
        setName('');
        setCategory('');
        setQuantity(0); // Reseteamos el estado de cantidad
      }
    } catch (error) {
      toast.error('Error creating product');
      console.error('Error creating product:', error);
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.nameCategory}
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
          Add Product
        </button>
      </form>
    </main>
  );
}
