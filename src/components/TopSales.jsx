import { useState, useEffect } from "react";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopSalesQuery } from "../slices/api";

export default function TopSales() {
  const [count, setCount] = useState("");
  const { data = [], error, isLoading } = useGetTopSalesQuery(count);

  console.log(data);
    return (
      <>
        <h2 className="text-center">Хиты продаж!</h2>
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
        )}
      </>
    );
}
