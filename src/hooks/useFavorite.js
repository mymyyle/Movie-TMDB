import { FavoriteContext } from "../contexts/FavoriteContext";
import { useContext } from "react";

const useFavorite = () => useContext(FavoriteContext);

export default useFavorite;
