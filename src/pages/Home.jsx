import React from "react";
import TopSales from "../components/TopSales";
import CatalogHome from "../components/CatalogHome";

export default function Home() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="https:/pevec1.github.io/ra67-diplom-react/img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            {/* <h2 className="text-center">Хиты продаж!</h2>
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div> */}
            <TopSales />
          </section>
          <section className="catalog">
            {/* <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div> */}
            <CatalogHome />
          </section>
        </div>
      </div>
    </main>
  );
}
