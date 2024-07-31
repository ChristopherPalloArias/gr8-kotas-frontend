"use client";

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddCategory() {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://rk1gux15jd.execute-api.us-east-2.amazonaws.com/categories/', {
        name,
        nameCategory: name,
      });
      if (response.status === 201) {
        toast.success('Category created successfully');
        setName('');
      }
    } catch (error) {
      toast.error('Error creating category');
      console.error('Error creating category:', error);
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </form>
    </main>
  );
}
