import React from 'react'

const Shop = ( { name, city, rating,  segment, timeToDelivery, rate, contacts = []  } ) => {
    return (
       <div className="col-lg-4 mb-4">
       <div className="card shadow shop-card">
       
        <div className="card-body">

        <div className="row">
            <div className="col-4 border-right">
            <img class="img-fluid pt-4"  style={{maxWidth: "105px", maxHeight: "105px"}}  src="images/office.jpg" alt="image" />
            </div>
            <div className="col-8">
            <p className="font-weight-normal text-dark">{name}</p>
        <p className="card-text"><span><i className="fa fa-star text-warning mr-2" />{rating}</span> - <span>{segment.name}</span> - <span>{city.name}</span></p>
        <p className="card-text"><span>{timeToDelivery}</span> - Entrega: <span>{rate}</span></p>
          
        <ul className="card-text">{
                contacts.map(({ id, type, content}) =>(
                    <li key={id}>
                        <div className="row">
                        <p className="col-6" >{type}</p>
                        <p className="col-6" >{content}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
            </div>
        </div>

    </div>
        
       </div>
       </div>
    )
}

export default Shop
