import React from "react";
import { useState } from "react";
import axios from "axios";
function Addtask() {
  const [addtask, setAddtask] = useState({ task: "" });
  const [updatetaskitem, setupdatetaskitem] = useState({ updatetask: "" });
  const { task } = addtask;
  const { updatetask } = updatetaskitem;
  const [alltask, setAlltask] = useState([]);
  const changehandler = (e) => {
    setAddtask({ ...addtask, [e.target.name]: e.target.value });
  };
  const deletehandler = (idd) => {
    console.log(idd);
    axios
      .delete(`http://localhost:5000/deletetask/${idd}`, addtask)
      .then((res) => {
        alert("ok");
        setAlltask(res.data);
        console.log(alltask);
      })
      .catch((e) => {
        alert(e);
      });
  };
  const submithandler = (ele) => {
    ele.preventDefault();
    if (addtask.task === "") {
      alert("task should not be empty");
    } else {
      console.log(addtask);
      axios
        .post("http://localhost:5000/PostTask", addtask)
        .then((res) => {
          setAlltask(res.data);
          console.log(alltask);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };
  const updatehandler = (e) => {
    setupdatetaskitem({ ...updatetaskitem, [e.target.name]: e.target.value });
  };
  const updatetaskhandler = (idd) => {
    if (updatetaskitem.updatetask === "") {
      alert("updating task should not be empty");
    } else {
      axios
        .put(`http://localhost:5000/update/${idd}`, updatetaskitem)
        .then((res) => {
          setAlltask(res.data);
          setupdatetaskitem({ updatetask: "" });
          console.log(alltask);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };
  return (
    <div>
      <center>
        <form onSubmit={submithandler}>
          <label>ADD TASK</label>
          <input
            type="text"
            name="task"
            value={task}
            onChange={changehandler}
          />
          <br />
          <input type="submit" value="ADD" />
        </form>
        <label>Update here</label>
        <input
          type="text"
          name="updatetask"
          value={updatetask}
          onChange={updatehandler}
        />
        <>
          <h4>ALL TASKS</h4>
          {alltask.map((e) => {
            return (
              <div>
                <form>
                  <h3>{e.task}</h3>
                  <input
                    type="button"
                    value="updatetask"
                    onClick={() => {
                      updatetaskhandler(e.taskid);
                    }}
                  />
                  <input
                    type="button"
                    value="deletatask"
                    onClick={() => deletehandler(e.taskid)}
                  />
                </form>
              </div>
            );
          })}
        </>
      </center>
    </div>
  );
}
export default Addtask;
