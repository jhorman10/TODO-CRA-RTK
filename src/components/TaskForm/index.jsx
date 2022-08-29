import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { addTask, editTask } from '../../features/tasks/taskSlice';

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate('/');
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <form className="bg-zinc-800 max-w-sm p-4 rounded-sm" onSubmit={handleSubmit}>
      <label htmlFor="title" className="block text-xs font-bold mb-1">
        Task:
      </label>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mn-2 mb-4"
      />
      <label htmlFor="description" className="block text-xs font-bold mb-1">
        Description:
      </label>
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mn-2 mb-4"
      ></textarea>
      <div className='flex justify-end '>
      <button className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
        Save
      </button>
      </div>
    </form>
  );
};
