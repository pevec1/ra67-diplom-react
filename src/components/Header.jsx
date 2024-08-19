import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/ra67-diplom-react/">
              <img
                src="/ra67-diplom-react/src/img/header-logo.png"
                alt="Bosa Noga"
              />
            </a>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/ra67-diplom-react/">
                    Главная
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/ra67-diplom-react/catalog">
                    Каталог
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/ra67-diplom-react/about">
                    О магазине
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/ra67-diplom-react/contact">
                    Контакты
                  </a>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
