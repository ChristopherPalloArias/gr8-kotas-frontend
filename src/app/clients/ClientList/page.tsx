// src/app/clients/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface Client {
  ci: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [editClient, setEditClient] = useState<Partial<Client>>({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("https://0ksbom6ekb.execute-api.us-east-2.amazonaws.com/clients/");
        setClients(response.data);
      } catch (error) {
        toast.error("Error fetching clients");
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client: Client) => {
    setEditingClient(client.ci);
    setEditClient(client);
  };

  const handleCancel = () => {
    setEditingClient(null);
    setEditClient({});
  };

  const handleSave = async (ci: string) => {
    try {
      await axios.put(`https://0ksbom6ekb.execute-api.us-east-2.amazonaws.com/clients/${ci}`, editClient);
      setClients((prevClients) =>
        prevClients.map((client) => (client.ci === ci ? { ...client, ...editClient } : client))
      );
      setEditingClient(null);
      setEditClient({});
      toast.success("Client updated successfully");
    } catch (error) {
      toast.error("Error updating client");
      console.error("Error updating client:", error);
    }
  };

  const handleDelete = async (ci: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this client?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://0ksbom6ekb.execute-api.us-east-2.amazonaws.com/clients/${ci}`);
              setClients((prevClients) => prevClients.filter((client) => client.ci !== ci));
              toast.success("Client deleted successfully");
            } catch (error) {
              toast.error("Error deleting client");
              console.error("Error deleting client:", error);
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
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr>
            <th className="w-1/5 py-2 px-4 border-b">CI</th>
            <th className="w-1/5 py-2 px-4 border-b">First Name</th>
            <th className="w-1/5 py-2 px-4 border-b">Last Name</th>
            <th className="w-1/5 py-2 px-4 border-b">Phone</th>
            <th className="w-1/5 py-2 px-4 border-b">Address</th>
            <th className="w-1/5 py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.ci}>
              <td className="w-1/5 py-2 px-4 border-b text-center">
                {client.ci}
              </td>
              <td className="w-1/5 py-2 px-4 border-b text-center">
                {editingClient === client.ci ? (
                  <input
                    type="text"
                    value={editClient.firstName !== undefined ? editClient.firstName : client.firstName}
                    onChange={(e) => setEditClient({ ...editClient, firstName: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  client.firstName
                )}
              </td>
              <td className="w-1/5 py-2 px-4 border-b text-center">
                {editingClient === client.ci ? (
                  <input
                    type="text"
                    value={editClient.lastName !== undefined ? editClient.lastName : client.lastName}
                    onChange={(e) => setEditClient({ ...editClient, lastName: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  client.lastName
                )}
              </td>
              <td className="w-1/5 py-2 px-4 border-b text-center">
                {editingClient === client.ci ? (
                  <input
                    type="text"
                    value={editClient.phone !== undefined ? editClient.phone : client.phone}
                    onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  client.phone
                )}
              </td>
              <td className="w-1/5 py-2 px-4 border-b text-center">
                {editingClient === client.ci ? (
                  <input
                    type="text"
                    value={editClient.address !== undefined ? editClient.address : client.address}
                    onChange={(e) => setEditClient({ ...editClient, address: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  client.address
                )}
              </td>
              <td className="w-1/5 py-2 px-4 border-b text-center">
                {editingClient === client.ci ? (
                  <>
                    <button
                      onClick={() => handleSave(client.ci)}
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
                      onClick={() => handleEdit(client)}
                      className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client.ci)}
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

export default ClientList;
