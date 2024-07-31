"use client";

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddClient() {
  const [ci, setCi] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://0ksbom6ekb.execute-api.us-east-2.amazonaws.com/clients/', {
        ci,
        firstName,
        lastName,
        phone,
        address,
      });
      if (response.status === 201) {
        toast.success('Client created successfully');
        setCi('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setAddress('');
      }
    } catch (error) {
      toast.error('Error creating client');
      console.error('Error creating client:', error);
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">CI:</label>
          <input
            type="text"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Client
        </button>
      </form>
    </main>
  );
}
