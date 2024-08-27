import React, { useEffect } from 'react'

import { useState, useRef } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { fetchSearch } from './../slices/searchSlice';

export default function Search() {
     const [text, setText] = useState("");
const [valtext, setVal] = useState("");
  const input = useRef(null);
    const list = useSelector((state) => state.search);
 
    const dispatch = useDispatch();
          const fetchOneUser = async (valtext) => {
            try {
              const data = await dispatch(fetchSearch(valtext)).unwrap();
              console.log("success", data);
            } catch (err) {
              console.log("error", `Fetch failed: ${err.message}`);
            }
          };
        //   useEffect(() => {
        //     fetchOneUser();
        //   }, []);

     const onSubmit = (event, text) => {
       event.preventDefault();
       console.log(event);
       setVal(text);
       fetchOneUser(valtext);
     }

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
