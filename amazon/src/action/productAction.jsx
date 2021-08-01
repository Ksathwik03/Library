export const getproductAction =() => dispatch => {
    dispatch({type:'get_product_req'})
    axios.get('http://localhost:5000/getproducts')
        .then(res => {
            if(res.status === 200){
                setData(res.data);
                dispatch({type: 'get_product_suc'})
            }
        })
}