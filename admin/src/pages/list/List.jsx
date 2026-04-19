// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify';


// const List = () => {

//   const url = "http://localhost:4000"

//   const [list, setList] = useState([]);

//   const fetchList = async () => {

//     const response = await axios.get(`${url}/api/food/list`);
//     if (response.data.success) {
//       setList(response.data.data)
//     }
//     else{
//       toast.error("error")   
//     }
//   }
//   const removeFood =async(foodId)=>{
//    const response =await axios.post(`${url}/api/food/remove`,{id:food})
//    await fetchList();
//   }

//   useEffect(()=>{
// fetchList();
//   },[])
//   return (
//     <div className='list add flex-col'>
//   <p>All Food list</p>
//   <div className="list-table">
//     <div className="list-table-format-tittle">
//       <p>image</p>
//       <p>name</p>
//       <p>category</p>
//       <p>price</p>
//       <p>action</p>
//       </div>
//       {list.map((item,index)=>{
//         return (
//           <div key={index} className='list-table-formet'>
//             <img src={`${url}${item.image}`} alt="" />
//            <p>{item.name}</p>
//            <p>{item.category}</p>
//            <p>{item.price}</p>
//            <p onClick={()=>removeFood(item.id)}>x</p>
//          <p>x</p>
//           </div>
//         )
//       })} 
//        </div>
//     </div>
//   )
// }

// export default List


import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {


  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("Server error while fetching list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food removed successfully");
        fetchList();
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      toast.error("Server error while removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food list</p>
      <div className="list-table">
        <div className="list-table-format-tittle">
          <p>image</p>
          <p>name</p>
          <p>category</p>
          <p>price</p>
          <p>action</p>
        </div>

        {list.map((item, index) => (
          <div key={index} className='list-table-formet'>
            {/* <img src={`${url}/uploads/${item.image}`} alt={item.name} /> */}
            <img src={`http://localhost:4000/uploads/${item.image}`} />


            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
