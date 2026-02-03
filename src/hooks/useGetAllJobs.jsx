import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import api from "@/utils/axios"; // ✅ use axios instance

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await api.get(
          `/api/v1/job/get?keyword=${searchedQuery || ""}`
        );

        if (res.data?.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error.response?.data || error.message
        );
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]); // ✅ dependency fixed
};

export default useGetAllJobs;
