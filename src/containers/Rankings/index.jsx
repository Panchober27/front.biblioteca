import React, { Fragment, useState, useEffect } from "react";
import AdministrationTable from "../../components/common/AdministrationTable";

import CarouselMultiply from "../../shared/components/carousel/CarouselMultiply";
import Catalog from "../../shared/components/catalog/ProductItems";


const Rankings = () => {
  const columns1 = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  const columns2 = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  const t1Data = [
    {
      id: 1,
      name: "Benjamin",
      lastName: "Meneses",
      email: "",
    },
    {
      id: 2,
      name: "Pancho",
      lastName: "Berwart",
      email: "",
    },
    {
      id: 3,
      name: "Daniel",
      lastName: "Muñoz",
      email: "",
    },
  ];
  const t2Data = [
    {
      id: 1,
      name: "Bart",
      lastName: "Simpson",
      email: "",
    },
    {
      id: 2,
      name: "Cristiano",
      lastName: "Ronaldo",
      email: "",
    },
    {
      id: 3,
      name: "Fernando",
      lastName: "Zampedri",
      email: "",
    },
  ];

  


  // datos para el catalogo.
  const items = [
    {
      id: 1,
      price: "$100",
      oldPrice: "$200",
      sale: true,
      new: true,
      src: `${process.env.PUBLIC_URL}/img/for_store/catalog/product_1.png`,
      title: "Producto 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      colors: ["#f5f5f5", "#f5f5f5", "#f5f5f5"],
    },
    {
      id: 2,
      price: "$100",
      oldPrice: "$200",
      sale: true,
      new: true,
      src: `${process.env.PUBLIC_URL}/img/for_store/catalog/product_2.png`,
      title: "Producto 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      colors: ["#f5f5f5", "#f5f5f5", "#f5f5f5"],
    }
  ]




  return (
    <Fragment>
      <h1>Rankings</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <AdministrationTable dataSource={t1Data} columns={columns1} />
        </div>
        <div className="col-12 col-md-6">
          <AdministrationTable dataSource={t2Data} columns={columns2} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <CarouselMultiply>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  <i className="fas fa-chart-bar" />
                  &nbsp; Ranking de usuarios
                </h4>
              </div>
            </div>
          </CarouselMultiply>
        </div>
        <div className="col-12 col-md-6">
        <Catalog
          items={items}
        />
        </div>
      </div>
    </Fragment>
  );
};

export default Rankings;
