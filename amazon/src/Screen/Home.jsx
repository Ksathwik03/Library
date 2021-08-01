import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Product from './Product'

function Home() {
    const [Data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/getproducts')
        .then(res => {
            if(res.status === 200){
                setData(res.data);
            }
        })
    }, [])
    if(Data.length === 0){
        return(
            <div>Loading</div>
        )
    }
    return (
        <div>
       <div className = "row justify-content-center">
        {Data.map(item => {
            return <Product item = {item}></Product>
          })
        }
        </div>
        </div>
    )
}

export default Home
