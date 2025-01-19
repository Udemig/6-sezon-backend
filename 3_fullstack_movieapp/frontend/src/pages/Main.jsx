import React, { useEffect } from "react";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const Main = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/api/movies123").then((res) => res.data),
  });

  console.log(data, error, isLoading);

  return <div>Main</div>;
};

export default Main;
