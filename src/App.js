import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import TaskGroups from './components/TaskGroups';
import Group from './components/TaskGroup';
import { getTaskData as mockAPI } from './services/api';
import Loader from './components/Loader';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [taskGroups, setTaskGroups] = useState({});

  //groups the tasks and transform the task object
  const generateGroups = data => {
    const groups = {};
    data.forEach(task => {
      const taskObj = {
        id: task.id,
        task: task.task,
        dependencyIds: task.dependencyIds,
        completedAt: task.completedAt
      };
      if (groups.hasOwnProperty(task.group)) {
        groups[task.group].push(taskObj);
      } else {
        groups[task.group] = [taskObj];
      }
    });

    setTaskGroups(groups);
  };

  //loop through all the tasks to check if all the dependency tasks are completed or not
  const checkDependencyTaskComplete = depIds => {
    const idsSet = new Set(depIds);

    for (let tG in taskGroups) {
      for (let task of taskGroups[tG]) {
        if (idsSet.has(task.id) && !task.completedAt) {
          return false;
        }
      }
    }

    return true;
  };

  const handleTaskChange = (groupName, taskId) => {
    let updatedGroup = [...taskGroups[groupName]];

    updatedGroup = updatedGroup.map(task => {
      if (task.id === taskId) {
        if (task.completedAt) {
          task.completedAt = null;
        } else if (
          (task.dependencyIds.length > 0 &&
            checkDependencyTaskComplete(task.dependencyIds)) ||
          task.dependencyIds.length < 1
        ) {
          task.completedAt = new Date().toUTCString();
        }
      }
      return task;
    });

    setTaskGroups({ ...taskGroups, [groupName]: updatedGroup });
  };

  async function fetchTaskData() {
    setIsLoading(true);
    try {
      const data = await mockAPI();
      generateGroups(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //handle error message
    }
  }

  useEffect(() => {
    fetchTaskData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <div style={{ textAlign: 'center' }}>
        <Route
          exact
          path="/"
          render={() => <TaskGroups taskData={taskGroups} />}
        />
        <Route
          exact
          path="/:taskGroup"
          render={props => (
            <Group
              taskData={taskGroups}
              handleTaskChange={handleTaskChange}
              checkDependencyTaskComplete={checkDependencyTaskComplete}
              {...props}
            />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default React.memo(App);
