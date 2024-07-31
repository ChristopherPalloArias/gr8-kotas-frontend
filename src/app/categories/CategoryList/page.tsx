"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface Category {
  name: string;
  nameCategory: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<Partial<Category>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://rk1gux15jd.execute-api.us-east-2.amazonaws.com/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category.name);
    setEditCategory(category);
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setEditCategory({});
  };

  const handleSave = async (name: string) => {
    try {
      await axios.put(`https://rk1gux15jd.execute-api.us-east-2.amazonaws.com/categories/${name}`, { nameCategory: editCategory.nameCategory });
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === name ? { ...category, ...editCategory } : category
        )
      );
      setEditingCategory(null);
      setEditCategory({});
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Error updating category");
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (name: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this category?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://rk1gux15jd.execute-api.us-east-2.amazonaws.com/categories/${name}`);
              setCategories((prevCategories) => prevCategories.filter((category) => category.name !== name));
              toast.success("Category deleted successfully");
            } catch (error) {
              toast.error("Error deleting category");
              console.error("Error deleting category:", error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 py-2 px-4 border-b">Name</th>
            <th className="w-1/2 py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name}>
              <td className="w-1/2 py-2 px-4 border-b text-center">
                {editingCategory === category.name ? (
                  <input
                    type="text"
                    value={editCategory.nameCategory || category.nameCategory}
                    onChange={(e) => setEditCategory({ ...editCategory, nameCategory: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  category.nameCategory
                )}
              </td>
              <td className="w-1/2 py-2 px-4 border-b text-center">
                {editingCategory === category.name ? (
                  <>
                    <button
                      onClick={() => handleSave(category.name)}
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
                      onClick={() => handleEdit(category)}
                      className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.name)}
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

export default CategoryList;
