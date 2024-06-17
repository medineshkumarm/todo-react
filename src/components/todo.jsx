/* eslint-disable react/prop-types */

const Todo = ({ todo, onUpdate, onDelete }) => {
  return (
    <div className="flex bg-slate-400 gap-4 justify-around p-2 rounded-md m-2 ">
      <div>
        <input
        
          type="checkbox"
          checked={todo.completed}
          onChange={() => onUpdate(todo._id, !todo.completed)}
        />
      </div>
      <div>
        <span>{todo.title}</span>
      </div>
      <div>
        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-600 text-white  px-4 py-1 rounded-lg">Delete</button>
      </div>
    </div>
  );
};

export default Todo;
