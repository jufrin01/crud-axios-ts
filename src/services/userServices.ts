import axios from "axios";
import type { User } from "../types/User";

const API = "http://localhost:3000/users";

//TODO GET DATA ENDPOINT
export const getUser = async (): Promise<User[]> => {
    const rest = await axios.get<User[]>(API);
    return rest.data;
};

//TODO CREATE DATA ENDPOINT
export const createUser = async (name : string) => {
    await axios.post(API, {name});
};

//TODO UPDATE DATA ENDPOINT
export const updateUser = async (id: number, name : string) => {
    await axios.put(`${API}/${id}`, {name});
};

//TODO DELETE DATA ENDPOINT
export const deleteUser = async (id: number) => {
    await axios.delete(`${API}/${id}`);
}