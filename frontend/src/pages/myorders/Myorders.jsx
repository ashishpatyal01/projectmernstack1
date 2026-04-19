import React, { useContext, useEffect, useState } from 'react'
// import '/myorders.css';
import './myorders.css';

import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorders = () => {
    // const [ url,token] = useContext(StoreContext)
    const { url, token } = useContext(StoreContext);

    // const [data,SetData] = useState({});
    const [data,setData] = useState([]);


    const fetchOrders = async  () =>{
        const response = await axios.post(url+"/api/orders/userOrders",{},{headers:{token}});
        // setData(response.data.data);
        setData(response.data.data);

        console.log(response.data.data)
    }
    
    useEffect(()=>{
   if (token) {
    fetchOrders();
   }
    },[token])

    return (
    <div>
      <div className="my-order">
        <h2>my order</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-order-order">
                      <img src={assets.parcel_icon} alt="" />
                      <p>{order.item.map((item,index)=>{
                        if (index === order.items.length-1) {
                            return item.name+"x"+item.quantity
                        }
                        else{
                                return item.name+"x"+item.quantity+","
                        }

                         })}</p>
                         <p>${order.amount}.00</p>
                         <p>items:{order.items.length}</p>
                         <p><span>&#25cf;</span><b>{order.status}</b></p>
                         <button>track order</button>
                    </div>
            )
            })}
        </div>
      </div>
    </div>
  )
}

export default Myorders

