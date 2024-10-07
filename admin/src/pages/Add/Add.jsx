import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    categories: "Electronics",
  });

  const imageUrl = image ? URL.createObjectURL(image) : assets.upload_area;

  // Handle input change for dynamic fields
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("categories", data.categories);
    console.log(formData);

    try {
      const response = await axios.post(
        `${url}products/create`,
        formData,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDI1MTc1NTljMWI3ZTNkNTgzMTA3MCIsImlhdCI6MTcyODI3NzM3NCwiZXhwIjoxNzI5NTczMzc0fQ.8EAdFRRaJ0VP2bvYYXYmaadArYt5Xx9GOLMl0mOfPMg",
          },
        },
      );
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          categories: "Electronics",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding product");
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
          <p>Product Name</p>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="categories"
              value={data.categories}
              onChange={onChangeHandler}
            >
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
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              type="number"
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
