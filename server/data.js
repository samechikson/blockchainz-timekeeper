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
    "date": "2018-07-02 00:00:00 -0400",
    "time": 5,
    "name": "Arielle Sysland"
  }, {
    "id": 2,
    "date": "2018-07-03 00:00:00 -0400",
    "time": 6,
    "name": "Dru Kimber"
  }, {
    "id": 3,
    "date": "2018-07-04 00:00:00 -0400",
    "time": 10,
    "name": "Dion Bettenay"
  }, {
    "id": 4,
    "date": "2018-07-05 00:00:00 -0400",
    "time": 5,
    "name": "Morlee Argabrite"
  }, {
    "id": 5,
    "date": "2018-07-06 00:00:00 -0400",
    "time": 6,
    "name": "Audra Harrad"
  }, {
    "id": 6,
    "date": "2018-07-07 00:00:00 -0400",
    "time": 4,
    "name": "Editha Moncur"
  }, {
    "id": 7,
    "date": "2018-07-08 00:00:00 -0400",
    "time": 6,
    "name": "Russ Spiniello"
  }, {
    "id": 8,
    "date": "2018-07-09 00:00:00 -0400",
    "time": 10,
    "name": "Brandea Sydenham"
  }, {
    "id": 9,
    "date": "2018-07-10 00:00:00 -0400",
    "time": 9,
    "name": "Bronson Coldrick"
  }, {
    "id": 10,
    "date": "2018-07-11 00:00:00 -0400",
    "time": 4,
    "name": "Town Denisyuk"
  }, {
    "id": 11,
    "date": "2018-07-12 00:00:00 -0400",
    "time": 5,
    "name": "Neal MacVean"
  }, {
    "id": 12,
    "date": "2018-07-13 00:00:00 -0400",
    "time": 8,
    "name": "Meara Tomaszek"
  }, {
    "id": 13,
    "date": "2018-07-14 00:00:00 -0400",
    "time": 4,
    "name": "Trenna Smogur"
  }, {
    "id": 14,
    "date": "2018-07-15 00:00:00 -0400",
    "time": 9,
    "name": "Gwynne Dudenie"
  }, {
    "id": 15,
    "date": "2018-07-16 00:00:00 -0400",
    "time": 4,
    "name": "Florencia Kearton"
  }, {
    "id": 16,
    "date": "2018-07-17 00:00:00 -0400",
    "time": 7,
    "name": "Orton Zambon"
  }, {
    "id": 17,
    "date": "2018-07-18 00:00:00 -0400",
    "time": 4,
    "name": "Brewer Meadley"
  }, {
    "id": 18,
    "date": "2018-07-19 00:00:00 -0400",
    "time": 7,
    "name": "Wendel Ducker"
  }, {
    "id": 19,
    "date": "2018-07-20 00:00:00 -0400",
    "time": 10,
    "name": "Nollie Deshorts"
  }, {
    "id": 20,
    "date": "2018-07-21 00:00:00 -0400",
    "time": 6,
    "name": "Elnar Keady"
  }];
}

export default { addNotifier, addSession, getSession, getTask, getTasks };
