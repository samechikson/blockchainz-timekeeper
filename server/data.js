const _sessions = {};
const _notifiers = {
  task: []
};

export const tasks = [
  {
    id: 'task-1',
    name: 'Initializing instance',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-2',
    name: 'Adding components',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-3',
    name: 'Testing infrastructure',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-4',
    name: 'Removing instance',
    percentComplete: 0,
    status: 'Waiting'
  }
];

const increments = [5, 10, 20, 25];

setInterval(
  () => {
    const task = tasks[
      Math.floor(Math.random() * tasks.length)
    ];

    if (!task.percentComplete) {
      task.status = 'Running';
    }

    _notifiers.task.forEach(notifier => notifier(task));
  },
  2000
);

setInterval(
  () => {
    tasks.forEach((task) => {
      if (task.status === 'Running') {
        if (task.percentComplete < 100) {
          task.percentComplete = Math.min(100, task.percentComplete +
            increments[
              Math.floor(Math.random() * increments.length)
            ]
          );
        } else {
          task.percentComplete = 0;
          task.status = 'Waiting';
        }
        _notifiers.task.forEach(notifier => notifier(task));
      }
    });
  },
  1000
);

export function addSession(token, data) {
  _sessions[token] = data;
}

export function getSession(token) {
  return _sessions[token];
}

export function addNotifier(type, cb) {
  _notifiers[type].push(cb);
}

export function getTasks(filters) {
  if (filters) {
    return Promise.resolve({
      tasks: tasks.filter(task =>
        Object.keys(filters).some(filter => task[filter] === filters[filter])
      )
    });
  }
  return Promise.resolve({ tasks });
}

export function getTask(id) {
  let task;
  tasks.some((t) => {
    if (t.id === id) {
      task = t;
      return true;
    }
    return false;
  });
  return Promise.resolve({ task });
}

export function getDays() {
  return [{
    "id": 1,
    "date": "2018-08-11 00:00:00 -0400",
    "time": 4,
    "name": "Heidi Phillimore"
  }, {
    "id": 2,
    "date": "2018-08-12 00:00:00 -0400",
    "time": 9,
    "name": "Bastien Hatley"
  }, {
    "id": 3,
    "date": "2018-08-13 00:00:00 -0400",
    "time": 8,
    "name": "Erminia Luetchford"
  }, {
    "id": 4,
    "date": "2018-08-14 00:00:00 -0400",
    "time": 5,
    "name": "Lulu Pearde"
  }, {
    "id": 5,
    "date": "2018-08-15 00:00:00 -0400",
    "time": 8,
    "name": "Bill Kliesl"
  }, {
    "id": 6,
    "date": "2018-08-16 00:00:00 -0400",
    "time": 7,
    "name": "Karola Allderidge"
  }, {
    "id": 7,
    "date": "2018-08-17 00:00:00 -0400",
    "time": 7,
    "name": "Arv Heinemann"
  }, {
    "id": 8,
    "date": "2018-08-18 00:00:00 -0400",
    "time": 10,
    "name": "Teresita Tour"
  }, {
    "id": 9,
    "date": "2018-08-19 00:00:00 -0400",
    "time": 4,
    "name": "Myrvyn Burnsell"
  }, {
    "id": 10,
    "date": "2018-08-20 00:00:00 -0400",
    "time": 5,
    "name": "Marten Tonn"
  }, {
    "id": 11,
    "date": "2018-08-21 00:00:00 -0400",
    "time": 4,
    "name": "Cully Flynn"
  }, {
    "id": 12,
    "date": "2018-08-22 00:00:00 -0400",
    "time": 6,
    "name": "Correna Slocumb"
  }, {
    "id": 13,
    "date": "2018-08-23 00:00:00 -0400",
    "time": 5,
    "name": "Marjie Goble"
  }, {
    "id": 14,
    "date": "2018-08-24 00:00:00 -0400",
    "time": 6,
    "name": "Lucinda Dark"
  }, {
    "id": 15,
    "date": "2018-08-25 00:00:00 -0400",
    "time": 10,
    "name": "Thurstan Nesterov"
  }, {
    "id": 16,
    "date": "2018-08-26 00:00:00 -0400",
    "time": 5,
    "name": "Kalina Dallosso"
  }, {
    "id": 17,
    "date": "2018-08-27 00:00:00 -0400",
    "time": 5,
    "name": "Samantha Ziemens"
  }, {
    "id": 18,
    "date": "2018-08-28 00:00:00 -0400",
    "time": 10,
    "name": "Helyn Jotcham"
  }, {
    "id": 19,
    "date": "2018-08-29 00:00:00 -0400",
    "time": 5,
    "name": "Mariska Smye"
  }, {
    "id": 20,
    "date": "2018-08-30 00:00:00 -0400",
    "time": 6,
    "name": "Dorothea Woodes"
  }];
}

export default { addNotifier, addSession, getSession, getTask, getTasks };
