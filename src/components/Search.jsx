import React, { useEffect } from 'react'

import { useState } from "react";

import { useDispatch } from 'react-redux';

import { fetchSearch } from './../slices/searchSlice';

export default function Search() {
     const [text, setText] = useState("");
const [valtext, setVal] = useState("");
    const dispatch = useDispatch();
          const fetchOneUser = async () => {
            try {
              const data = await dispatch(fetchSearch(valtext)).unwrap();
              console.log("success", data);
            } catch (err) {
              console.log("error", `Fetch failed: ${err.message}`);
            }
          };
          useEffect(() => {
            fetchOneUser();
          }, [valtext]);

     const onSubmit = (event) => {
       event.preventDefault();
       console.log(event);
       setText({ text: event.target[0].value });
     }

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input
        className="form-control"
        placeholder="Поиск"
        onChange={(e) => setVal(e.target.value)}
        value={valtext}
      />
    </form>
  );
}
