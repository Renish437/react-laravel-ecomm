import React, { useEffect, useState, useRef, useMemo } from "react";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast, ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";
const CreateProduct = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [port, setPort] = useState([]);
  const [portsChecked, setPortsChecked] = useState([]);
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

    const fetchPorts = async () => {
        const res = await fetch(apiUrl + "/ports", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
    
            setPort(result.data);
          });
      };

  const saveProduct = async (data) => {
    // setDisable(true);

    const formData = { ...data, description: content, gallery: gallery };
    console.log(formData);

    const res = await fetch(apiUrl + "/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()} `,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        console.log(result);
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          const formErrors = result.message;
          console.error(formErrors);
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  const fetchCategories = async () => {
    const res = await fetch(apiUrl + "/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()} `,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
      });
  };
  const fetchBrands = async () => {
    const res = await fetch(apiUrl + "/brands", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        setBrands(result.data);
      });
  };
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisable(true);
    const res = await fetch(apiUrl + "/temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
      
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.data && result.data.id && result.data.image_url) {
          // Update the gallery state
          gallery.push(result.data.id);
          setGallery(gallery);

          // Update the gallery images state
          galleryImages.push(result.data.image_url);
          setGalleryImages(galleryImages);
        } else {
          console.error(
            "Response does not contain the required data:",
            result.data
          );
        }
              
              
        if (result.status === 400) {
          // Safely handle errors
          // const errorMessage = Array.isArray(result.message.image)
          //   ? result.message.image[0] // Get the first error message
          //   : "An unknown error occurred"; // Fallback message
          const errorMessage=result.message.image[0]

          console.log(result.message);
          toast.error(errorMessage); // Display the error in a toast
          console.log(errorMessage);
          
        } else {
          toast.success(result.message || "Image added successfully!");
        }
        setDisable(false);
        e.target.value = "";
      });
  };

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter((gallery) => gallery !== image);
    setGalleryImages(newGallery);
  };

 
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchPorts();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Products / Create</h4>
          <Link to="/admin/products" className="link btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <form onSubmit={handleSubmit(saveProduct)}>
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Title
                  </label>
                  <input
                    {...register("title", {
                      required: "The title field is required",
                    })}
                    type="text"
                    className={`form-control ${errors.title && "is-invalid"}`}
                    placeholder="Title Name"
                  />
                  {errors.title && (
                    <p className="invalid-feedback">{errors.title.message}</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "The category field is required",
                        })}
                        className={`form-control ${
                          errors.category && "is-invalid"
                        }`}
                        id=""
                      >
                        <option value="">Select a Category</option>
                        {categories &&
                          categories.map((category) => {
                            return (
                              <option
                                key={`category-${category.id}`}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.category && (
                        <p className="invalid-feedback">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Brand
                      </label>
                      <select
                        {...register("brand", {
                          required: "The brand field is required",
                        })}
                        className={`form-control ${
                          errors.brand && "is-invalid"
                        }`}
                        id=""
                      >
                        <option value="">Select a Brand</option>
                        {brands &&
                          brands.map((brand) => {
                            return (
                              <option
                                key={`brand-${brand.id}`}
                                value={brand.id}
                              >
                                {brand.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.brand && (
                        <p className="invalid-feedback">
                          {errors.brand.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Short Description
                  </label>
                  <textarea
                    name=""
                    {...register("short_description", {
                      required: "The short description field is required",
                    })}
                    id=""
                    className={`form-control ${
                      errors.short_description && "is-invalid"
                    }`}
                    placeholder="Short description"
                    rows={3}
                  ></textarea>
                  {errors.short_description && (
                    <p className="invalid-feedback">
                      {errors.short_description.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Description
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  />
                </div>
                <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Price
                      </label>
                      <input
                        type="text"
                        {...register("price", {
                          required: "The price field is required",
                        })}
                        placeholder="Price"
                        className={`form-control ${
                          errors.price && "is-invalid"
                        }`}
                      />
                      {errors.price && (
                        <p className="invalid-feedback">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Compare Price
                      </label>
                      <input
                        type="text"
                        {...register("compare_price")}
                        placeholder="Compare Price"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        SKU
                      </label>
                      <input
                        type="text"
                        {...register("sku", {
                          required: "The sku field is required",
                        })}
                        placeholder="SKU"
                        className={`form-control ${errors.sku && "is-invalid"}`}
                      />
                      {errors.sku && (
                        <p className="invalid-feedback">{errors.sku.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Barcode
                      </label>
                      <input
                        type="text"
                        {...register("barcode")}
                        placeholder="Barcode"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Qty
                      </label>
                      <input
                        type="text"
                        {...register("qty", {
                          required: "The quantity field is required",
                        })}
                        placeholder="Qty"
                        className={`form-control ${errors.qty && "is-invalid"}`}
                      />
                      {errors.qty && (
                        <p className="invalid-feedback">{errors.qty.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select
                        {...register("status", {
                          required: "Please select a status",
                        })}
                        className={`form-control ${
                          errors.status && "is-invalid"
                        }`}
                      >
                        <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">Unactive</option>
                      </select>
                      {errors.status && (
                        <p className="invalid-feedback">
                          {errors.status?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Featured
                  </label>
                  <select
                    {...register("is_featured", {
                      required: "This field is required",
                    })}
                    className={`form-control ${
                      errors.is_featured && "is-invalid"
                    }`}
                  >
                    <option value="">Select status</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  {errors.is_featured && (
                    <p className="invalid-feedback">
                      {errors.is_featured?.message}
                    </p>
                  )}
                </div>
                <h3 className="py-3 border-bottom mb-3"> Colors</h3>
                <div className="mb-3">
                 
                  {
                      port && port.map((port,index)=>{
                      return(
                        <div className=" form-check-inline ps-2" key={`ports-${index}`}>
                        <input 
                        {
                          ...register('ports')
                        }
                         className=""
                         checked={portsChecked.includes(port.id)}
                         onChange={(e)=>{
                          if(e.target.checked){
                            setPortsChecked([...portsChecked,port.id]);
                          }
                          else{
                            setPortsChecked(portsChecked.filter(pid=>port.id!=pid));
                          }
                         }}
                          type="checkbox" value={port.id} id={`port-${port.id}`}/>
                        <label className="form-check-label ps-2" htmlFor={`port-${port.id}`}>
                          {port.name}
                        </label>
                      </div>
                      )
                    })
                  }
               
                </div>
                <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFile}
                    accept="image/*"
                  />
                </div>

                <div className="mb-3">
                  <div className="row">
                    {galleryImages &&
                      galleryImages.map((imageUrl, index) => {
                        return (
                          <div className="col-md-3" key={`image-${index}`}>
                            <div className="card p-1 shadow">
                              <img
                                src={imageUrl}
                                alt="image"
                                className="w-100"
                              />
                              <button
                                className="btn btn-danger mt-3 w-100"
                                onClick={() => deleteImage(imageUrl)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    <div className="col-md-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <button disabled={disable} className="btn btn-primary mt-3 mb-3">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
