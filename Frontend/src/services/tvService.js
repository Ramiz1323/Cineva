import publicAxiosClient from "../api/publicAxiosClient";

export const getTrendingTv = async (page = 1) => {
  const res = await publicAxiosClient.get("/tv/trending", {
    params: { page }
  });
  return res.data;
};

export const getPopularTv = async (page = 1) => {
  const res = await publicAxiosClient.get("/tv/popular", {
    params: { page }
  });
  return res.data;
};

export const getTopRatedTv = async (page = 1) => {
  const res = await publicAxiosClient.get("/tv/top-rated", {
    params: { page }
  });
  return res.data;
};
