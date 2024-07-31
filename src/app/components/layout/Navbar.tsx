"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setDropdown(dropdown === name ? null : name);
  };

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex items-center justify-between p-4">
        <div>
          <Link href="/dashboard" className={`mr-4 ${pathname === '/dashboard' ? 'font-bold' : ''}`}>
            Dashboard
          </Link>
          <div className="relative inline-block text-left">
            <button onClick={() => toggleDropdown('users')} className="mr-4">
              Users
            </button>
            {dropdown === 'users' && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link href="/users/UserList" className="block px-4 py-2" onClick={() => setDropdown(null)}>User List</Link>
                <Link href="/users/AddUser" className="block px-4 py-2" onClick={() => setDropdown(null)}>Add User</Link>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button onClick={() => toggleDropdown('categories')} className="mr-4">
              Categories
            </button>
            {dropdown === 'categories' && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link href="/categories/CategoryList" className="block px-4 py-2" onClick={() => setDropdown(null)}>Category List</Link>
                <Link href="/categories/AddCategory" className="block px-4 py-2" onClick={() => setDropdown(null)}>Add Category</Link>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button onClick={() => toggleDropdown('products')} className="mr-4">
              Products
            </button>
            {dropdown === 'products' && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link href="/products/ProductList" className="block px-4 py-2" onClick={() => setDropdown(null)}>Product List</Link>
                <Link href="/products/AddProduct" className="block px-4 py-2" onClick={() => setDropdown(null)}>Add Product</Link>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button onClick={() => toggleDropdown('clients')} className="mr-4">
              Clients
            </button>
            {dropdown === 'clients' && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link href="/clients/ClientList" className="block px-4 py-2" onClick={() => setDropdown(null)}>Client List</Link>
                <Link href="/clients/AddClient" className="block px-4 py-2" onClick={() => setDropdown(null)}>Add Client</Link>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button onClick={() => toggleDropdown('sales')} className="mr-4">
              Sales
            </button>
            {dropdown === 'sales' && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link href="/sales/SaleList" className="block px-4 py-2" onClick={() => setDropdown(null)}>Sale List</Link>
                <Link href="/sales/AddSale" className="block px-4 py-2" onClick={() => setDropdown(null)}>Add Sale</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
