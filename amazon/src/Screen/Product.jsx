import React from 'react'
import {Link} from 'react-router-dom'

function Product(ite){
    const item = ite.item;
    return (
        <div className= "col-3 m-5 card p-2 " key={item.id}>
            <Link to={`/product/${item.id}`}>
            <img src = {item.image} className="img-fluid"></img>
            <h4>{item.name}</h4>
            <h5>Rating: {item.rating}</h5>
            <h5>{item.price}</h5>
            </Link>
        </div>
    )
}

export default Product
