import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
 // const [arr, setArr] = useState();
 let arr = [];
  const list = useSelector((state) => state.search.result);
  const [id, setId] = useState(0);
  const [offset, setOffset] = useState(0);
  const [another, setAnother] = useState(true);
  let search;
  const [count, setCount] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const { data = [], error, isLoading } = useGetCatQuery(count);
  const {
    data: data2 = [],
    error: error2,
    isLoading: isLoading2,
  } = useGetGoodsQuery(id);
  const {
    data: data3 = [],
    error: error3,
    isLoading: isLoading3,
  } = useGetGoodsAllQuery();
  const {
    data: data4 = [],
    error: error4,
    isLoading: isLoading4,
  } = useGetGoodsAllOffsetQuery({ offset });
  const {
    data: data5 = [],
    error: error5,
    isLoading: isLoading5,
  } = useGetGoodsOffsetQuery({ id, offset });
  const [isActive, setIsActive] = useState("all");
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const onClick = async (e, id, title ) => {
    e.preventDefault();
    searchParams.set("q", "");
    setSearchParams(searchParams);
    setIsActive(title);
    setId(id);
  }; // console.log(getGoods);
  const onClickAll = async (e, c) => {
    searchParams.set("q", "");
    setSearchParams(searchParams);
    // dispatch(fetchSearch(""));
    setIsActive(c);
    setAnother(true);
    setId(c);
  }; // console.log(getGoods);
  console.log(data);
  console.log(id, offset);

  const onClickAllOffset = async (e, offset) => {
    e.preventDefault();
    console.log(offset);
    searchParams.set("q", "");
    setSearchParams(searchParams);
    //dispatch(fetchSearch(""));
    setOffset(offset);
    setIsActive("all");
    setId("0");
    arr = arr.concat(data4);
    // if (arr === undefined) {
    //   setArr([]);
    // }
    // setArr([...arr,...data4]); //setArr(data4);
    //  data.find((el) => {
    //    el.title.trim().toLowerCase() === isActive.trim().toLowerCase() || 0;
    //    setId(el.id || 0);
    //  });
    // console.log(data, offset, id, isActive);

    if (data4.length < 6) {
      setAnother(false);
      setOffset(6);
    } else {
      setAnother(true);
      setOffset(offset + 6);
    } // handle result here
  }; // console.log(getGoods);

  useEffect(() => {
    console.log(searchParams.get("q"));
    if (searchParams.get("q") && searchParams.get("q") !== "#") {
      dispatch(fetchSearch(searchParams.get("q")));
      setOffset(offset);
    } else {
    searchParams.set("q", "");
    setSearchParams(searchParams);
    //dispatch(fetchSearch(""));
   // setIsActive("all");
  // setOffset(offset);
    setAnother(true);
    //setArr(data4);
      
    }
  }, [searchParams,data4, offset]);

  console.log(data, data2, data3, data4, data5, arr, error);
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
                  onClick={(e) => onClick(e, cat.id, cat.title )}
                  href="#"
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="row">
            {(id === "all" ? data3 : id === "0" ? arr : data2).map((product, id) => (
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
                onClick={(e) => onClickAllOffset(e, offset + 6)}
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
