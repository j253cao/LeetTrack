const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/";
const middleware = {
  getQuery: async (route: string, headers: HeadersInit | undefined) => {
    try {
      const response = await fetch(URL.concat(route), {
        method: "GET",
        mode: "cors",
        headers,
      });

      return response.json();
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  postQuery: async (
    route: string,
    body: string,
    headers: HeadersInit | undefined
  ) => {
    try {
      const response = await fetch(URL.concat(route), {
        method: "POST",
        mode: "cors",
        headers,
        body,
      });

      return response.json();
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },

  deleteQuery: async (
    route: string,
    body: string,
    headers: HeadersInit | undefined
  ) => {
    try {
      const response = await fetch(URL.concat(route), {
        method: "DELETE",
        mode: "cors",
        headers,
        body,
      });

      return response.json();
    } catch (error) {
      console.log(`error: ${error}`);
    }
  },
};

export default middleware;
