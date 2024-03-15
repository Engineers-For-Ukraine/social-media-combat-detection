import http from "../http-common";

class MessageDataService {

  get(id) {
    return http.get(`/messages/${id}`);
  }

  update(id, data) {
    return http.put(`/messages/${id}`, data);
  }

}

export default new MessageDataService();
