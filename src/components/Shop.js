import React from "react";
import Contact from "./Contact";

const Shop = ({
  id,
  name,
  city,
  rating,
  segment,
  timeToDelivery,
  rate,
  contacts = [],
  logoSrc = "images/office.jpg"
}) => {
  return (
    <div className="col-lg-4 mb-4">
      <div className="card shadow shop-card">
        <div className="card-body">
          <div className="row">
            <div className="col-4 border-right">
              <img
                className="img-fluid pt-4"
                style={{ maxWidth: "105px", maxHeight: "105px" }}
                src={`${logoSrc}`}
                alt="shop logo"
              />
            </div>
            <div className="col-8">
              <p className="d-block font-weight-normal text-dark">
                {name}
                <span className="float-right text-warning">
                  <i className="fa fa-star text-warning mr-3" />
                  {rating}
                </span>
              </p>

              <p className="card-text">
                <span>{segment.name}</span> - <span>{city.name}</span>
              </p>
              <p className="card-text">
                <span>{timeToDelivery}</span> - Entrega: <span>{rate}</span>
              </p>

              <div className="card-text">
                {contacts.map(({ type, content }) => {
                  return (
                    <div key={`${id}_${type}`} className="row">
                      <Contact key={id} type={type} content={content} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
