import axios from "axios";
import revereGeocode from "latlng-to-zip";
import qs from "qs";

import { FETCH_JOBS } from "./types";

const JOB_ROOT_URL = "http://api.indeed.com/ads/apisearch?";

const JOB_QUERY_PARAMS = {
  publisher: "4201738803816157",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 25,
  q: "javascript"
};

const buildJobUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = region => {
  return async dispatch => {
    try {
      let zip = await revereGeocode(region);
      const url = buildJobUrl(zip);

      let { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS, payload: data });
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  };
};
