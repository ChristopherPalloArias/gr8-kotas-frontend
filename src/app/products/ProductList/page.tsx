"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface Product {
  productId: string;
  name: string;
  category: string;
  quantity: number;
}

interface Category {
  name: string;
  nameCategory: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dmerkzjfj3.execute-api.us-east-2.amazonaws.com/products");
        setProducts(response.data);
      } catch (error) {
        toast.error("Error fetching products");
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://rk1gux15jd.execute-api.us-east-2.amazonaws.com/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories");
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product.productId);
    setEditProduct(product);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditProduct({});
  };

  const handleSave = async (productId: string) => {
    try {
      await axios.put(`https://dmerkzjfj3.execute-api.us-east-2.amazonaws.com/products/${productId}`, {
        name: editProduct.name,
        category: editProduct.category,
        quantity: editProduct.quantity
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId ? { ...product, ...editProduct } : product
        )
      );
      setEditingProduct(null);
      setEditProduct({});
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Error updating product");
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (productId: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://dmerkzjfj3.execute-api.us-east-2.amazonaws.com/products/${productId}`);
              setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== productId));
              toast.success("Product deleted successfully");
            } catch (error) {
              toast.error("Error deleting product");
              console.error("Error deleting product:", error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr>
            <th className="w-1/4 py-2 px-4 border-b">Name</th>
            <th className="w-1/4 py-2 px-4 border-b">Category</th>
            <th className="w-1/4 py-2 px-4 border-b">Quantity</th>
            <th className="w-1/4 py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td className="py-2 px-4 border-b text-center">
                {editingProduct === product.productId ? (
                  <input
                    type="text"
                    value={editProduct.name || product.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingProduct === product.productId ? (
                  <select
                    value={editProduct.category || product.category}
                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    className="p-2 border rounded"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.nameCategory}
                      </option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingProduct === product.productId ? (
                  <input
                    type="number"
                    value={editProduct.quantity !== undefined ? editProduct.quantity : product.quantity}
                    onChange={(e) => setEditProduct({ ...editProduct, quantity: Number(e.target.value) })}
                    className="p-2 border rounded"
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingProduct === product.productId ? (
                  <>
                    <button
                      onClick={() => handleSave(product.productId)}
                      className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ProductList;
