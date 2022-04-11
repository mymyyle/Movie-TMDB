import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const useData = () => {
  return useContext(DataContext);
};

export default useData;
