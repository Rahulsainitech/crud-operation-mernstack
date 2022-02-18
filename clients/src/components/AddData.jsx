import React, { useReducer } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import  reducer   from "./ReducerPart";
import  initialState from "./ReducerInitial";


const AddData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useNavigate();
  const inputHandler = (e, name) => {
    switch (name) {
      case "userId":
        dispatch({ type: "userId", payload:Number(e.target.value) });
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
    console.log(state.title.value,state.body.value)
    const updateRequest = async () => {
      try {
        await fetch(`/post/`, {
          method: "POST",
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
      <form onSubmit={onSubmitHandler} className="form container" style={{marginTop:"5rem"}}>
        <div className="col-12 my-5">
          <h3 className="py-3 text-center bg-light my-4">Add Data</h3>
        </div>
        <div className="row d-flex justify-content-center mt-4 ">
          <div className="col-12 col-md-2">
            <label for="userId" className="form-level">
              User id
            </label>
            <input
              id="userId"
              className=" form-control form-control-lg"
              value={state.userId.value}
              onChange={(e) => inputHandler(e, "userId")}
              type="number"
              placeholder="for eg. 1,2 ,3"
              required
            />
          </div>
          <div className="col-12 col-md-2">
            <label for="id" className="">
              id
            </label>
            <input
              id="id"
              className=" form-control form-control-lg"
              value={state.id.value}
              onChange={(e) => inputHandler(e, "id")}
              type="number"
              placeholder="for eg. 1,2 ,3"
              required
            />
          </div>
          <div className="col-12 col-md-2">
            <label for="title" className="">
              Title
            </label>
            <input
              id="title"
              className=" form-control form-control-lg"
              value={state.title.value}
              onChange={(e) => inputHandler(e, "title")}
              type="text"
              placeholder="enter title"
              required
            />
          </div>
          <div className="col-12 col-md-2">
            <label for="body" className="">
              Description
            </label>
            <input
              id="body"
              className=" form-control form-control-lg"
              value={state.body.value}
              onChange={(e) => inputHandler(e, "body")}
              type="text"
              placeholder="enter desc"
              required
            />
          </div>
        </div>
        <div className="d-flex">
          <Button type="submit" className="btn btn-success mx-auto my-5">
            submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddData;
