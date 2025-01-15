import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Shop from "./components/Shop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.scss";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import { Bounce, Flip, ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/admin/Dashboard";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import ShowCategory from "./components/admin/category/ShowCategory";
import EditCategory from "./components/admin/category/EditCategory";
import CreateCategory from "./components/admin/category/CreateCategory";
import ShowBrands from "./components/admin/brands/ShowBrands";
import CreateBrands from "./components/admin/brands/CreateBrands";
import EditBrands from "./components/admin/brands/EditBrands";
import CreateProduct from "./components/admin/product/CreateProduct";
import ShowProduct from "./components/admin/product/ShowProduct";
import EditProduct from "./components/admin/product/EditProduct";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/admin/login",
          element: <Login />,
        },
        {
          path: "/admin/dashboard",
          element: (
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/categories",
          element: (
            <AdminRequireAuth>
             <ShowCategory/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/categories/edit/:id",
          element: (
            <AdminRequireAuth>
             <EditCategory/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/categories/create",
          element: (
            <AdminRequireAuth>
             <CreateCategory/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/brands",
          element: (
            <AdminRequireAuth>
             <ShowBrands/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/brands/create",
          element: (
            <AdminRequireAuth>
             <CreateBrands/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/brands/edit/:id",
          element: (
            <AdminRequireAuth>
             <EditBrands/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/products",
          element: (
            <AdminRequireAuth>
             <ShowProduct/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/products/create",
          element: (
            <AdminRequireAuth>
             <CreateProduct/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/products/edit/:id",
          element: (
            <AdminRequireAuth>
             <EditProduct/>
            </AdminRequireAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <>
     
      
      <RouterProvider router={router} />
<ToastContainer autoClose='3000' transition={Bounce} />

    
   </>
  );
}

export default App;
