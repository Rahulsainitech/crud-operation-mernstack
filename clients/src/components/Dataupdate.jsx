import React, { useEffect, useState, useReducer } from "react";
import { Button ,Table} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import  reducer from "./ReducerPart";
import  initialState from "./ReducerInitial";

const Dataupadate = () => {
  const [product, setProduct] = useState();
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        await fetch(`/get/${id}`)
          .then(async (res) => await res.json())
          .then((d) => setProduct(d.product))
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    };
    fetchHandler();
  }, [id]);

  const updateHandler = () => {
    setShow(true);
  };
  const deleteHandler = () => {
    alert("delete data");
    const deleteRequest = async () => {
      try {
        await fetch(`/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((d) => console.log(d))
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    };
    deleteRequest().then(() => history("/GET"));
  };
  const inputHandler = (e, userId) => {
    switch (userId) {
      case "userId":
        dispatch({ type: "userId", payload: Number(e.target.value) });
        break;
      case "id":
        dispatch({ type: "id", payload: Number(e.target.value) });
        break;
      case "title":
        dispatch({ type: "title", payload: e.target.value });
        break;
      case "body":
        dispatch({ type: "body", payload: e.target.value });
        break;
     
      default:
        break;
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updateRequest = async () => {
      try {
        await fetch(`/put/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: state.userId.value,
            id: state.id.value,
            title: state.title.value,
            body: state.body.value,
            
          }),
        })
          .then(async (res) => await res.json())
          .then((d) => console.log("updated data is", d))
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    };
    updateRequest().then(() => history("/GET"));
    console.log(state);
  };
  return (
    <>
      <div className="container" style={{marginTop:"5rem"}}>
        <div className="col-12 my-5">
          <h3 className="py-2 text-center mt-5 bg-warning">Update Data</h3>
        </div>
        <div className="row">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>userid</th>
              <th>id</th>
              <th>title</th>
              <th>body</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
         
                    {product && product.map((value) => {
              const { userId, title, id, body,_id } = value;
              return (
                <tr key={id}>
                  <td>{userId}</td>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                  <td><Button onClick={updateHandler} className="btn btn-primary">edit</Button></td>
                  <td><Button onClick={deleteHandler} className="btn btn-danger">Delete</Button></td>
                </tr>
              );
            })}
            </tbody>      
            </Table>

          {show &&
            product &&
            product.map((val) => {
              const { userId, id, body, title, isFeatured, _id } = val;
              return (
                <form
                  onSubmit={onSubmitHandler}
                  className="col-12 col-md-8 form container"
                  key={_id}
                >
                  <div className="row d-flex justify-content-center mt-4 ">
                    <div className="col-12 col-md-3">
                      <label for="userId" className="form-level">
                        userId
                      </label>
                      <input
                        id="userId"
                        className=" form-control form-control-lg"
                        value={state.userId.value}
                        onChange={(e) => inputHandler(e, "userId")}
                        type="number"
                        placeholder={userId}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <label for="id" className="">
                        id
                      </label>
                      <input
                        id="id"
                        className=" form-control form-control-lg"
                        value={state.id.value}
                        onChange={(e) => inputHandler(e, "id")}
                        type="number"
                        placeholder={id}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <label for="title" className="">
                        title
                      </label>
                      <input
                        id="title"
                        className=" form-control form-control-lg"
                        value={state.title.value}
                        onChange={(e) => inputHandler(e, "title")}
                        type="text"
                        placeholder={title}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <label for="body" className="">
                        Description
                      </label>
                      <input
                        id="body"
                        className=" form-control form-control-lg"
                        value={state.body.value}
                        onChange={(e) => inputHandler(e, "body")}
                        type="text"
                        placeholder={body}
                        required
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center mt-5 ">
                    
                    <button type="submit" className="btn btn-success">
                      Success
                    </button>
                  </div>
                </form>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Dataupadate;
