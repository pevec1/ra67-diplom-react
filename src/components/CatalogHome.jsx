import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchTopSales, fetchCategories, fetchCategory } from "../slices/sliceMag";

export default function CatalogHome() {
  const list = useSelector((state) => state.categories);
  const full = useSelector((state) => state.category);
    const [cat, setCat] = useState([{}]);
  const dispatch = useDispatch();
          const fetchOneCategory = async () => {
            try {
              const data = await dispatch(fetchCategories()).unwrap();
              console.log("success", data)
            } catch (err) {
              console.log("error", `Fetch failed: ${err.message}`);
            }
          };

          const fetchCategory1 = async (a) => {
            try {
              const resultAction = await dispatch(fetchCategory(a)).unwrap();
              //const originalPromiseResult = unwrapResult(resultAction)
    console.log("success", setCat([[...cat],resultAction]));// handle result here
  } catch (rejectedValueOrSerializedError) {
    console.log(
      "error",
      `Fetch failed: ${rejectedValueOrSerializedError.message}`
    );// handle error here
  }
}

useEffect(() => {
fetchOneCategory();
list.categories.map((product) => [product.id].map((element, key)=>{
  console.log(element, key)
  setTimeout(() => {
    dispatch(fetchCategory(element));
    setCat([...cat,full.category]);
  }, 5000)
	
})
)
  }, []);

console.log(cat)
console.log(full)
// useEffect(() => {
//   setTimeout(() => {
//     //setCategory(categories.map((cat) => {fetchCategory1(cat.id)}));
//   }, 2000)
  
// }, []);

  if (list.categories.length===0) {
    return (
      <>
        <h2 className="text-center">Каталог</h2>
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-cat="all"
              href="/"
            >
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
          {/* {category.map((product, id) => (
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
          ))} */}
        </div>
      </>
    );
}
}