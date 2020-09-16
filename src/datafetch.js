export const board = () => {
    return fetch(`"https://cors-anywhere.herokuapp.com/https://react-kanban-server.herokuapp.com/"`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  