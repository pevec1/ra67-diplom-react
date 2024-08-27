import React from 'react'

import CatalogHome from "../components/CatalogHome";

export default function Catalog() {

   return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="https://github.com/pevec1/ra67-diplom-react/blob/main/img/banner.jpg?raw=true"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <CatalogHome />
        </div>
      </div>
    </main>
  );
}
