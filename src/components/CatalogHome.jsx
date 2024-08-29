import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  api,
  useGetCatQuery,
  useGetGoodsQuery,
  useGetGoodsAllQuery,
  useGetGoodsAllOffsetQuery,
  useGetGoodsOffsetQuery,
  useGetGoodsOffsetSearchQuery,
  useGetGoodsAllOffsetSearchQuery,
} from "../slices/api";
import Search from "../components/Search";
import { fetchSearch } from "../store";

export default function CatalogHome() {
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const list = useSelector((state) => state.search);
  const [id, setId] = useState(0);
  const [offset, setOffset] = useState(6);
  const [another, setAnother] = useState(true);
  const [count, setCount] = useState("");
  const { data = [], error, isLoading } = useGetCatQuery(count);
  const { data:data2 = [], error: error2, isLoading: isLoading2 } =
    useGetGoodsQuery(id);
  const { data: data3 = [], error: error3, isLoading: isLoading3 } =
    useGetGoodsAllQuery();
  const {
    data: data4 = [],
    error: error4,
    isLoading: isLoading4,
  } = useGetGoodsAllOffsetQuery({ offset });
  const {
    data: data5 = [],
    error: error5,
    isLoading: isLoading5,
  } = useGetGoodsOffsetQuery({ categoryId: id, offset });
  const [isActive, setIsActive] = useState("all");
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const onClick = async (e, id, title) => {
    e.preventDefault();
    setIsActive(title);
    setArr(data2);
  }; // console.log(getGoods);
  const onClickAll = async () => {
    setIsActive("all");
    setAnother(true);
    setArr(data3);
  }; // console.log(getGoods);
  console.log(data);
  console.log(id, offset);
  const onClickAllOffset = async (e, offset) => {
    e.preventDefault();
    setOffset(offset + 6);
    setArr(data4);
    //  data.find((el) => {
    //    el.title.trim().toLowerCase() === isActive.trim().toLowerCase() || 0;
    //    setId(el.id || 0);
    //  });
    // console.log(data, offset, id, isActive);

    if (data2.length < 6) {
      setAnother(false);
    } else {
      setAnother(true);
    } // handle result here
  }; // console.log(getGoods);
  useEffect(() => {
      console.log(localStorage.getItem("search"));
    if(localStorage.getItem("search")!==""){
    dispatch(fetchSearch(localStorage.getItem("search")));
    setArr(list.result);
      
    } else {
      // dispatch(api.endpoints.getGoodsAll.initiate());
     setIsActive("all");
     setAnother(true);
     setArr(data3);
    }
   }, []);
  
  console.log(data, data2, data3, data4, data5, list, arr, error);
  console.log(isActive);

  return (
    <>
      <h2 className="text-center">Каталог</h2>
      <Search />
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
                className={
                  "nav-link " + `${isActive === "all" ? " active" : ""}`
                }
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
                    "nav-link" + `${isActive === cat.title ? " active" : ""}`
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
            {arr.map((product, id) => (
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
                onClick={(e) => onClickAllOffset(e, offset)}
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
