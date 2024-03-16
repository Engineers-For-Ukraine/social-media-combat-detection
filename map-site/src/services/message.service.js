import http from "../http-common";

class MessageDataService {
  getAll() {
    return http.get("/messages");
  }

  get(id) {
    return http.get(`/messages/${id}`);
  }
}

export default new MessageDataService();
