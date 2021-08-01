import React from 'react'
import { useParams } from 'react-router';
import Data from '../components/Data';

function Detail(){
    const id = useParams().id;
    const data = Data.find(item => item.id === id)
    console.log(data)
    return (
        <div className="row">
        <div className="col-md-6 card m-1">
        <h1>{data.name}</h1>
        <img className="img-fluid" id="detail_img" src = {data.image} alt="img"></img>
        </div>
        <div className = "col">
            <h3 className="float-left">Price: {data.price}</h3>
            <hr></hr>
            <h3>
            Select Quantity
            <select className="ms-3">
            {[...Array(data.countInStock).keys()].map((x,i) => {
                return <option value={i+1}>{i+1}</option>
            })}
            </select>
            <button className="btn btn-dark text-right ms-5" >Add to cart</button>
            </h3>
            <hr></hr>
            <h3>Description</h3>
            <div className="text-start">{data.description}</div>
            <h3>Reviews:</h3>
            <div>{data.reviews}</div>
        </div>
        </div>
    )
}

export default Detail
