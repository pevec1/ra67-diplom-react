import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useGetCatQuery, useGetGoodsMutation, useGetGoodsAllMutation, useGetGoodsAllOffsetMutation } from "../slices/sliceMagRTK";

export default function CatalogHome() {
  const [offset, setOffset] = useState(6);
  const [another, setAnother] = useState(true);
  const [count, setCount] = useState("");
  const { data = [], isLoadingList } = useGetCatQuery(count);
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState([]);
  const [getGoods, isLoading] = useGetGoodsMutation();
  const [getGoodsAll, isLoading2] = useGetGoodsAllMutation();
  const [getGoodsAllOffset, isLoading3] = useGetGoodsAllOffsetMutation();
  const [isActive, setIsActive] = useState(0);
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
 const onClick = async (e, id, title) => {
    e.preventDefault();
    setIsActive(title);
    try {
      const data = await getGoods(id).unwrap();

      console.log(data);
      setProducts(data); // handle result here
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError); // handle error here
    }
  }; // console.log(getGoods);
  const onClickAll = async () => {
   try {
      const data = await getGoodsAll().unwrap();

      console.log(data);
      setProducts(data); // handle result here
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError); // handle error here
    }
  }; // console.log(getGoods);
  const onClickAllOffset = async (e, offset, title) => {
    e.preventDefault();
    setIsActive(title);
    setOffset(offset + 6);
   try {
      const data = await getGoodsAllOffset({offset: offset}).unwrap();

      console.log(data);
      if (data.length < 6) {
        setAnother(false);
      }
      setProducts([...products, ...data]); // handle result here
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError); // handle error here
    }
  }; // console.log(getGoods);
  console.log(data);
   useEffect(() => {
      onClickAll();
  }, []);

  if (isLoading === true) {
    return (
      <>
        <h2 className="text-center">Каталог</h2>
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
            <a
              className={"nav-link" + `${isActive === "all" && " active"}`}
              data-cat="all"
              onClick={(e) => onClickAll(e, "all")}
              href="#"
            >
              Все
            </a>
          </li>
          {data.map((cat, id) => (
            <li key={id} className="nav-item">
              <a
                className={
                  "nav-link" + `${isActive === cat.title && " active"}`
                }
                onClick={(e) => onClick(e, cat.id, cat.title)}
                href="#"
              >
                {cat.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="row">
          {products.map((product, id) => (
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
        <div className="text-center">
          {another === false ? null : (
            <button
              className="btn btn-outline-primary"
              onClick={(e) => onClickAllOffset(e, offset, "all")}
            >
              Загрузить ещё
            </button>
          )}
        </div>
      </>
    );
  }
}
