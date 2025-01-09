import { http, HttpResponse } from "msw";

const baseURL = "http://localhost:3000"; // or your base URL

export const handlers = [
      // Mock GET request
  http.get(`${baseURL}/api/`, () => {
    return HttpResponse.json({ message: "success"});
  }),
];
