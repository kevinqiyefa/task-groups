import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import completed from '../../assets/completed.svg';
import incomplete from '../../assets/incomplete.svg';
import locked from '../../assets/locked.svg';
import './style.css';

function taskGroup({
  taskData,
  location,
  handleTaskChange,
  checkDependencyTaskComplete
}) {
  //convert pathname back to orginal task group name
  const groupName = location.pathname
    .slice(1)
    .split('-')
    .map(word => word.replace(/^\w/, c => c.toUpperCase()))
    .join(' ');

  if (!(groupName in taskData)) {
    return <Redirect to="/" />;
  }

  const taggleTask = (id, isLocked) => {
    !isLocked && handleTaskChange(groupName, id);
  };

  const tasks = taskData[groupName];

  const displayTasks = tasks.map(t => {
    const isLocked =
      t.dependencyIds.length > 0 &&
      !checkDependencyTaskComplete(t.dependencyIds);

    return (
      <div
        key={t.id}
        onClick={() => taggleTask(t.id, isLocked)}
        className={
          !t.completedAt ? (isLocked ? 'locked' : 'incomplete') : 'completed'
        }
      >
        <img
          src={!t.completedAt ? (isLocked ? locked : incomplete) : completed}
          alt="taskIcon"
        />
        <p>{t.task}</p>
      </div>
    );
  });
  return (
    <div className="task-group-container">
      <div className="header-wrapper">
        <h1>{groupName}</h1>
        <Link to="/">ALL GROUPS</Link>
      </div>

      <div className="tasks-wrapper">{displayTasks}</div>
    </div>
  );
}

export default React.memo(taskGroup);
