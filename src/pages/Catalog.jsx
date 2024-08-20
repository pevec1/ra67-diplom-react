import React from 'react'

import CatalogHome from "../components/CatalogHome";

export default function Catalog() {
  return (
        <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
          </div>

    <CatalogHome />

            </div>
      </div>
    </main>

  )
}
