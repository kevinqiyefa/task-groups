import data from './data.json';
const taskData = data;

//fake API response
export const getTaskData = (delay = 1000) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(taskData);
    }, delay);
  });
};
