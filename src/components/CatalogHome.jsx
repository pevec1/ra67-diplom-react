import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useGetCatQuery, useGetGoodsMutation } from "../slices/sliceMagRTK";

export default function CatalogHome() {
  const [count, setCount] = useState("");
  const { list = [], isLoadingList } = useGetCatQuery(count);
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState([]);
  const { data = [], isLoading } = useGetGoodsMutation(cat);

  console.log(list);
  list.map((product) =>
    [product.id].forEach((element, key) => {
      console.log(element, key);

      setCat(element);
    })
  );
  console.log(cat);
  console.log(data);
  // useEffect(() => {
  //   setTimeout(() => {
  //     //setCategory(categories.map((cat) => {fetchCategory1(cat.id)}));
  //   }, 2000)

  // }, []);

  if (isLoading === true) {
    return (
      <>
        <h2 className="text-center">Каталог</h2>
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" data-cat="all" href="/">
              Все
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Женская обувь
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Мужская обувь
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Обувь унисекс
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Детская обувь
            </a>
          </li>
        </ul>
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2 className="text-center">Каталог</h2>
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" data-cat="all" href="#">
              Все
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Женская обувь
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Мужская обувь
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Обувь унисекс
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Детская обувь
            </a>
          </li>
        </ul>
        <div className="row">
          {data.map((product, id) => (
            <div key={id} className="col-4">
              <div className="card">
                <img
                  src={product.images[0]}
                  className="card-img-top img-fluid"
                  alt={product.title}
                />
                <div className="card-body">
                  <p className="card-text">{product.title}</p>
                  <p className="card-text">{product.price} руб.</p>
                  <a
                    href={"/products/" + product.id}
                    className="btn btn-outline-primary"
                  >
                    Заказать
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
