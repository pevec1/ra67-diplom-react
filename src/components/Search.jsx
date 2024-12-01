import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate  } from "react-router-dom";

import { fetchSearch, setSearch } from "./../slices/searchSlice";

export default function Search() {
  const [text, setText] = useState("");
  const [valtext, setVal] = useState("");
   let [searchParams, setSearchParams] = useSearchParams();

  const list = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("q")) {
      setText('');
      navigate(`/ra67-diplom-react/catalog?q=${searchParams.get("q")}`);
    }
  }, [searchParams]);
console.log(searchParams.get("q"));

  function handleSubmit(event) {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    let params = { q: event.target[0].value };
    console.log(params);
    setSearchParams(params);
  }


  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input
        className="form-control"
        placeholder="Поиск"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  );
}
