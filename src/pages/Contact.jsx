import React from "react";

export default function Contact() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="/ra67-diplom-react/src/img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Контакты</h2>
            <p>
              Наш головной офис расположен в г.Москва, по адресу: Варшавское
              шоссе, д. 17, бизнес-центр W Plaza.
            </p>
            <h5 className="text-center">Координаты для связи:</h5>
            <p>
              Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>{" "}
              (ежедневно: с 09-00 до 21-00)
            </p>
            <p>
              Email: <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
