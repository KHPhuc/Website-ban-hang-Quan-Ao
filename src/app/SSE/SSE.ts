import { fetchEventSource } from "@microsoft/fetch-event-source";

const serverURL = "http://localhost:5000/sse";

// export const fetchData = () => {
//   let source = new EventSource(serverURL);
//   source.onmessage = (event) => {
//     console.log(event.data);
//   };
// };

export const fetchData = async () => {
  await fetchEventSource(`${serverURL}`, {
    method: "GET",
    headers: {
      Accept: "text/event-stream",
    },
    async onopen(res) {
      if (res.ok && res.status === 200) {
        console.log("Connection made ", res);
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        console.log("Client side error ", res);
      }
    },
    async onmessage(event) {
      console.log(event.data);
    },
    onclose() {
      console.log("Connection closed by the server");
    },
    onerror(err) {
      console.log("There was an error from server", err);
    },
  });
};
