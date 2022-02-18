import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [data1, setData1] = useState([]);
  const fetchHandler = async () => {
    const data = await fetch("/GET");
    const response = await data.json();
    console.log(response);
    setData1(response.allData);

    console.log(response);
  };

//   this function is used to post api data to server 
//   const SendData = async () => {
//     console.log("data is sending");
//     let payload = {
//       data: data1,
//     };
//     const data = await axios("/post", {
//       method: "post",
//       data: payload,
//     });
//     const res = await data.json()
//     console.log(res)
//   };

  useEffect(() => {
    fetchHandler();
  }, []);
  return (
    <>
      {/* <Button onClick={() => SendData()}>send data</Button> */}
       <Container style={{marginTop:"5rem"}}>
       <h3 className="bg-success py-2 text-center text-white">All Data</h3>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>userid</th>
              <th>id</th>
              <th>title</th>
              <th>Description</th>
              <th>Update or Delete</th>
            </tr>
          </thead>
          <tbody>
            {!data1? '<h4 style={{position:"absolute",top:"50%",left:"45%"}}>Loading ....</h4>':data1.map((value) => {
              const { userId, title, id, body,_id } = value;
              return (
                <tr key={id}>
                  <td>{userId}</td>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                  <td><NavLink to={`/PUT/${_id}`} className="btn btn-danger"><span style={{ color:"black"}}>Update</span>/Delete</NavLink></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container> 
    </>
  );
};

export default Home;
