import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../../features/tasks/taskSlice';

export const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1 className="font-bold">Tasks {tasks.length}</h1>
        <Link
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm"
          to="create-task"
        >
          Create task
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map(({ id, title, description }) => (
          <div key={id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h3>{title}</h3>
              <div className="flex gap-x-2">
                <Link
                  className="bg-blue-600 px-2 py-1 text-xs rounded-md"
                  to={`/edit-task/${id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            </header>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
