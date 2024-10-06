import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null); 
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",  
  });

  const imageUrl = image ? URL.createObjectURL(image) : assets.upload_area;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.name || !data.description || !data.price || !image) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));  
    formData.append("category", data.category);  
    formData.append("image", image);

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/products/create`, formData, {
        headers: {
          Authorization: `Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDI1MTc1NTljMWI3ZTNkNTgzMTA3MCIsImlhdCI6MTcyODIwNTE4MywiZXhwIjoxNzI5NTAxMTgzfQ.XFhmHJ8bObglx-B2US-PCtmSnwHMW8SZtrQglzzRsTk`,
        },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Electronics", 
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={imageUrl} alt="upload-area" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Electronics">Electronics</option>
              <option value="Cameras">Cameras</option>
              <option value="Laptops">Laptops</option>
              <option value="Accessories">Accessories</option>
              <option value="Headphones">Headphones</option>
              <option value="Food">Food</option>
              <option value="Books">Books</option>
              <option value="Clothes/Shoes">Clothes/Shoes</option>
              <option value="Beauty/Health">Beauty/Health</option>
              <option value="Sports">Sports</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
