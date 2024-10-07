import { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [products, setProducts] = useState([]);
  const imageUrl = import.meta.env.VITE_APP_URL_IMAGE;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}products/get-all-products`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDI1MTc1NTljMWI3ZTNkNTgzMTA3MCIsImlhdCI6MTcyODI3NzM3NCwiZXhwIjoxNzI5NTczMzc0fQ.8EAdFRRaJ0VP2bvYYXYmaadArYt5Xx9GOLMl0mOfPMg",
        },
      });
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  // Remove a product by ID
  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${url}products/delete/${productId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDI1MTc1NTljMWI3ZTNkNTgzMTA3MCIsImlhdCI6MTcyODI3NzM3NCwiZXhwIjoxNzI5NTczMzc0fQ.8EAdFRRaJ0VP2bvYYXYmaadArYt5Xx9GOLMl0mOfPMg",
          },
        }
      );
      await fetchProducts();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {products.map((product, index) => (
          <div className="list-table-format" key={index}>
            <img src={`${imageUrl}/temp/${product.image}`} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.categories}</p>
            <p>${product.price}</p>
            <p onClick={() => removeProduct(product._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
