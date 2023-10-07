import axios from "axios";
export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "bd463b3099b14640aa0e7242483db3fe",
  },
});
