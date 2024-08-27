import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  api,
  useGetCatQuery,
  useGetGoodsMutation,
  useGetGoodsAllMutation,
  useGetGoodsOffsetMutation,
  useGetGoodsAllOffsetMutation,
} from "../slices/api";
import Search from "../components/Search";


export default function CatalogHome() {
  const dispatch = useDispatch();
    const list = useSelector((state) => state.search);
  const [id, setId] = useState(0);
  const [offset, setOffset] = useState(6);
  const [another, setAnother] = useState(true);
  const [count, setCount] = useState("");
  const { data = [], error, isLoading } = useGetCatQuery(count);
  const [getGoods, { error: error2, isLoading: isLoading2 }] =
    useGetGoodsMutation();
  const [data2, setData2] = useState([]);
  const [getGoodsAll, { error: error3, isLoading: isLoading3 }] =
    useGetGoodsAllMutation();
  const [data3, setData3] = useState([]);
  const [getGoodsAllOffset, { error: error4, isLoading: isLoading4 }] =
    useGetGoodsAllOffsetMutation();
  const [data4, setData4] = useState([]);
  const [getGoodsOffset, { error: error5, isLoading: isLoading5 }] =
    useGetGoodsOffsetMutation();
  const [data5, setData5] = useState([]);
  const [isActive, setIsActive] = useState("all");
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
 console.log(text)
  const onClick = async (e, id, title) => {
    e.preventDefault();
    setIsActive(title);
    const data2 = await getGoods(id);
    setData3(data2.data);
  }; // console.log(getGoods);
  const onClickAll = async () => {
    setIsActive("all");
    setAnother(true);
    const data3 = await getGoodsAll();
    setData3(data3.data);
  }; // console.log(getGoods);
  console.log(data);
  console.log(id, offset);
  const onClickAllOffset = async (e, offset) => {
    e.preventDefault();
    setOffset(offset + 6);
    //  data.find((el) => {
    //    el.title.trim().toLowerCase() === isActive.trim().toLowerCase() || 0;
    //    setId(el.id || 0);
    //  });
    // console.log(data, offset, id, isActive);

    const data6 = await getGoodsAllOffset({ offset: offset });
    setData3([...data3, ...data6.data]);
    if (data6.data.length < 6) {
      setAnother(false);
    } else {
      setAnother(true);
    } // handle result here
  }; // console.log(getGoods);
  useEffect(() => {
    onClickAll();
   }, []);
  console.log(data, data2, data3, data4, data5, list);
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
            {list.result.map((product, id) => (
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
            {data3.map((product, id) => (
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
