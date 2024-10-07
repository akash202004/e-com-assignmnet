import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProductForm = ({ product, url, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        categories: product.categories.join(", "), // Adjust as necessary
        image: product.image,
        price: product.price,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${url}products/update/${product._id}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDI1MTc1NTljMWI3ZTNkNTgzMTA3MCIsImlhdCI6MTcyODI5MDg4OCwiZXhwIjoxNzI5NTg2ODg4fQ.yy0VVIKGR_I63NRp7aUV4vvLHbqPPFvDiHf5M5vgcYQ", // Update with actual token
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        onProductUpdated(); // Callback to refresh products
        onClose(); // Close the form/modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="Categories (comma separated)"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button type="submit">Update Product</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
