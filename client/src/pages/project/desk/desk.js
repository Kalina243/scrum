import { useEffect, useState } from "react";
import "./desk.css";
import { useParams } from "react-router-dom";
import { findProjectById } from "../../../idb/project";
import { TASK_STATUSES, getAllProjectsTasks } from "../../../idb/task";
import Task from "../../../components/task/task";

function Desk({ setError }) {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);

  const updateData = async () => {
    try {
      const projectObj = await findProjectById(+projectID);
      const tasksObj = await getAllProjectsTasks(projectObj);
      setProject(projectObj);
      setTasks(tasksObj);
    } catch (error) {
      console.log("updateData ERROR BACKLOG", error);
      setError({ isError: true, message: error.message });
    }
  };

  useEffect(() => {
    updateData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="desk-container p-3">
      <div className="mb-3 col-4">
        <label htmlFor="storypoints" className="form-label lead">
          Выберите спринт
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={""}
          onChange={() => {}}
          name="assigne"
          id="assigne"
        >
          <option value="1">Спринт 1</option>
          <option value="2">Спринт 2</option>
          <option value="3">Спринт 3</option>
        </select>
      </div>

      <div className="container">
        <div className="row p-2">
          <div className="col lead">TODO</div>
          <div className="col lead">DOING</div>
          <div className="col lead">DONE</div>
        </div>
        <div className="row p-2">
          <div className="col">
            {tasks &&
              tasks.map((task) => {
                if (task.status === TASK_STATUSES.TODO) {
                  return <Task key={task.id} task={task} />;
                }
              })}
          </div>
          <div className="col">
            {tasks &&
              tasks.map((task) => {
                if (task.status === TASK_STATUSES.DOING) {
                  return <Task key={task.id} task={task} />;
                }
              })}
          </div>
          <div className="col">
            {tasks &&
              tasks.map((task) => {
                if (task.status === TASK_STATUSES.DONE) {
                  return <Task key={task.id} task={task} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desk;