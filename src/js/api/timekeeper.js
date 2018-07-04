
export function getTime() {
  return fetch('http://localhost:8102/api/time/days');
}

export default {
  getTime
};
