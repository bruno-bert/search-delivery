import React from "react";
import PropTypes from "prop-types";

const ContactType = {
  IFOOD: "IFOOD",
  SITE: "SITE",
  PHONE: "TELEFONE",
  CELLPHONE: "CELULAR",
  WHATSAPP: "WHATSAPP"
};

const Contact = ({ type, content }) => {
  switch (String(type).toUpperCase()) {
    case ContactType.SITE:
      return (
        <>
          <p className="col-12">
            <i className="fa fa-external-link text-primary mr-5" />
            <a rel="noopener noreferrer" target="_blank" href={content}>
              {type}
            </a>
          </p>
        </>
      );

    case ContactType.IFOOD:
      return (
        <>
          <p className="col-12">
            <img className="mr-5" src="images/ifood.png" alt="ifood logo" />
            <a rel="noopener noreferrer" target="_blank" href={content}>
              {type}
            </a>
          </p>
        </>
      );

    case ContactType.PHONE || ContactType.CELLPHONE: {
      return (
        <>
          <p className="col-12">
            <i className="fa fa-phone text-primary mr-5" />
            <a href={`tel:${content}`}>{content}</a>
          </p>
        </>
      );
    }

    case ContactType.WHATSAPP: {
      return (
        <>
          <p className="col-12">
            <i className="fa fa-whatsapp text-primary mr-5" />
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=${content}`}
            >
              {content}
            </a>
          </p>
        </>
      );
    }

    default:
      return (
        <>
          <p className="col-6">{type}</p>
          <p className="col-6">{content}</p>
        </>
      );
  }
};

Contact.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default Contact;
