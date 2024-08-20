import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { api, useGetCatQuery, useGetGoodsMutation, useGetGoodsAllMutation, useGetGoodsAllOffsetMutation } from "../slices/api";

export default function CatalogHome() {
  const dispatch = useDispatch();
const [offset, setOffset] = useState(6);
  const [another, setAnother] = useState(true);
  const [count, setCount] = useState("");
  const { data = [], error, isLoading } = useGetCatQuery(count);
  const { data: data2 = [], refetch: refetch2,error: error2, isLoading: isLoading2 } = useGetGoodsMutation();
  const { data: data3 = [], refetch: refetch3, error: error3, isLoading: isLoading3 } = useGetGoodsAllMutation();
  const { data:data4 = [], refetch: refetch4, error: error4, isLoading: isLoading4 } = useGetGoodsAllOffsetMutation();
  const [isActive, setIsActive] = useState(0);

    function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
 const onClick = async (e, id, title) => {
    e.preventDefault();
    setIsActive(title);
    refetch2({id: id});
  }; // console.log(getGoods);
  const onClickAll = async (e, title) => {
   setIsActive(title);
refetch3()
  }; // console.log(getGoods);
  const onClickAllOffset = async (e, offset, title) => {
    e.preventDefault();
    setIsActive(title);
    setOffset(offset + 6);
dispatch(
  api.endpoints.getGoodsAllOffset.initiate(
    { offset: offset },
    { subscribe: false, forceRefetch: true }
  )
);
      if (data.length < 6) {
        setAnother(false);
      }// handle result here
  }; // console.log(getGoods);
  console.log(data, data2, data3, data4);
   useEffect(() => {
      onClickAll();
  }, []);

  return (
      <>
        <h2 className="text-center">Каталог</h2>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </>
        ) : (
          <>
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a
              className={"nav-link " + `${(isActive === "all") ? " active" : ""}`}
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
                  "nav-link" + `${(isActive === cat.title) ? " active" : ""}`
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
          {data4.map((product, id) => (
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
        )}
      </>
  );
}
