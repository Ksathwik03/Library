export const getproductReducer =(state ={} ,action) => {

    switch(action.type)
    {
        case 'get_product_req' : return{
            loading : true
        }
        case 'get_product_suc' : return{
            products : action.payload,
            loading: false
        }
        default : state
    }
}
