import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchSearch } from "./../slices/searchSlice";

export default function Search() {
  const [text, setText] = useState("");
  const [valtext, setVal] = useState("");
  const list = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const fetchOneUser = async (text) => {
    try {
      const data = await dispatch(fetchSearch(text)).unwrap();
      console.log("success", data);
    } catch (err) {
      console.log("error", `Fetch failed: ${err.message}`);
    }
  };
  //   useEffect(() => {
  //     fetchOneUser();
  //   }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    fetchOneUser(text);
    console.log(text);
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input
        className="form-control"
        placeholder="Поиск"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  );
}
