import axios from "axios";
import { Country } from "../types/Country";
const BASE_URL = "https://restcountries.com/v3.1/all";

const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

// 데이터 가져오기 함수
async function fetchData(): Promise<Country[]> {
  try {
    const response = await api.get<Country[]>("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export { fetchData };
