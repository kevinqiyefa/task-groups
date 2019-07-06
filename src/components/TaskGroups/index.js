import React from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';

import groupIcon from '../../assets/group.svg';
import './style.css';

function taskGroups({ taskData }) {
  const taskGroups = {};

  const transformTaskGroupData = () => {
    for (let taskGroup in taskData) {
      let completedCount = 0;

      for (let task of taskData[taskGroup]) {
        if (task.completedAt) completedCount++;
      }
      taskGroups[taskGroup] = {
        tasks: taskData[taskGroup],
        completedCount: completedCount
      };
    }
  };

  transformTaskGroupData();

  let showTaskGroups = null;

  if (Object.keys(taskGroups).length > 0) {
    showTaskGroups = Object.keys(taskGroups).map(taskGroup => (
      <Link to={`/${taskGroup.toLowerCase().replace(/ /g, '-')}`} key={uuid()}>
        <div className="group-content-wrapper">
          <img src={groupIcon} alt="groupIcon" />

          <div className="group-text-wrapper">
            <h2>{taskGroup}</h2>
            <p>{`${taskGroups[taskGroup].completedCount} OF ${
              taskGroups[taskGroup].tasks.length
            } TASKS COMPLETE`}</p>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <div className="task-groups">
      <h1>Things To Do</h1>

      <div className="task-group">{showTaskGroups}</div>
    </div>
  );
}

export default taskGroups;
