import React, { useState, useEffect, useCallback } from "react";
import "./datatable.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userColumns, productColumns } from "./UserDatatablesource";

const Datatable = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const handleColumns =
    location.pathname === "/users" ? userColumns : productColumns;

  const usersUrl = "https://fakerapi.it/api/v1/persons?_quantity=10";

  const productsUrl = "https://fakerapi.it/api/v1/products?_quantity=8";

  useEffect(
    useCallback(() => {
      if (location.pathname === "/users") {
        try {
          axios.get(usersUrl).then((response) => {
            setUsers(() => response.data.data);
          });
        } catch (error) {
          console.log(`UsersError is`);
        }
      } else if (location.pathname === "/products") {
        try {
          axios.get(productsUrl).then((response) => {
            setProducts(() => response.data.data);
          });
        } catch (error) {
          console.log(`ProductsErro is ${error}`);
        }
      }
    }),
    []
  );

  const handleDelete = (id) => {
    location.pathname === "/users"
      ? setUsers(() => users.filter((item) => item.id !== id))
      : setProducts(() => products.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="/users/test"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // ======================================
  //    RETURN columns.concat(actionColumn)
  // ======================================

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {location.pathname === "/users" ? "Users" : "Products"}
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={location.pathname === "/users" ? users : products}
        columns={handleColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

// const [url, setUrl] = useState("");

// if (location.pathname == "/users") {
//   setUrl("https://fakerapi.it/api/v1/persons?_quantity=15");
// }
// if (location.pathname == "/users/clients") {
//   setUrl("https://fakerapi.it/api/v1/companies?_quantity=1");
// }
// if (location.pathname == "/products") {
//   setUrl("https://fakerapi.it/api/v1/products?_quantity=1");
// }

// useEffect(() => {
//   setDataList(() => (location.pathname === "/users" ? users : products));
// }, [location]);
// const [dataList, setDataList] = useState([]);
// const dataList = location.pathname === "/users" ? users : products;
