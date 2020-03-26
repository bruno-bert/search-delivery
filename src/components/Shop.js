import React from 'react'

const Shop = ( { name, city, description, likes, dislikes, segment, contacts   } ) => {
    return (
       <>
       <div className="card">
    <div className="card-header">{name}</div>
    <div className="card-body">
        <p>Ramo: <span>{segment}</span></p>
        <p>Descrição: <span>{description}</span></p>
        <p>Cidade: <span>{city}</span></p>
        

        <ul>{
                contacts.map(({ id, type, content}) =>(
                    <li key={id}>
                        <p>{type}</p>
                        <p>{content}</p>
                    </li>
                ))
            }
        </ul>
    </div>
      <div className="card-footer">
          
        <p>Likes</p><span>{likes}</span>
        <p>Dislikes</p><span>{dislikes}</span>
          </div>      
       </div>
       </>
    )
}

export default Shop
