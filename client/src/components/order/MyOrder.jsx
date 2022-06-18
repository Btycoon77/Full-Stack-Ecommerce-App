import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { clearErrors,myOrders } from '../actions/orderAction';
import LaunchIcon from '@mui/icons-material/Launch'
import './myOrder.css'


export default function MyOrders() {
  
    const dispatch = useDispatch();
    const alert = useAlert();
   
    const {error,orders} = useSelector((state)=>state.myOrders);

    const  {user} = useSelector((state)=>state.user);
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minwidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          width: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`order/${params.getValue(params.id, "id")}`}>
                <LaunchIcon />
              </Link>
            );
          },
        },
      ];
      const rows = [];

      orders && orders.forEach((item,index)=>{
          rows.push({
              itemsQty: item.orderItems.length,
              id: item._id,
              status: item.orderStatus,
              amount: item.totalPrice
          });
      });

      useEffect(() => {
       if(error){
           alert.error(error);
           dispatch(clearErrors)
       };
       dispatch(myOrders());
      },[dispatch,alert,error])
      

  return (
      <>
      
    <div className="myOrdersPage">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    <Typography id="myOrdersHeading"> Orders</Typography>
    </>
  );
}
