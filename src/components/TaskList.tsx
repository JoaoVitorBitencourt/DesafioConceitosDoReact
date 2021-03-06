import { useState } from 'react'

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [id, setId] = useState(0);

  function handleCreateNewTask() {
    if(newTaskTitle) {
      setTasks([...tasks, {
        id: id,
        isComplete: false,
        title: newTaskTitle
      }]);
      setId(id + 1);
    } else {
      alert("Informe um titulo");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(el => {
      if(el.id === id) {
        el.isComplete = !el.isComplete;
        return el; 
      } else {
        return el;
      }
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const tasksRestantes = tasks.filter(el => el.id !== id);

    setTasks(tasksRestantes);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}