import axios from "axios";
import type { User } from "../types/User";

const API = "http://localhost:3000";

export const getUser = async (): Promise<User[]> => {
    const rest = await axios.get<User[]>(API);
    return rest.data;
};

export const createUser = async (name : string) => {
    await axios.post(API, {name});
};

export const updateUser = async (id: number, name : string) => {
    await axios.put(`${API}/${id}`, name);
};

export const deleteUser = async (id: number) => {
    await axios.delete(`${API}/${id}`);
}