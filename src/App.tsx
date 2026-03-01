import {useEffect , useState } from "react";
import type { FormEvent } from "react";
import type {User} from "./types/User";
import { getUser , updateUser , createUser , deleteUser} from "./services/userServices.ts";

function App() {

    //TODO STAMEN BUAT SET DATA
    const [user , setUser] = useState<User[]>([]);
    const [name ,setName] = useState<string>("");
    const [editId , setEditId] = useState<number |  null>(null);

    //TODO FETCH DATA USER 1
    const fetchUser = async () => {
        const data = await getUser();
        setUser(data);
    };

    //TODO LOAD DATA USER 2
    useEffect(() => {
        const loadUser = async () => {
            const data = await getUser();
            setUser(data)
        };
        loadUser();
    }, []);

    //TODO logic handling submit
    const handlingSumbit = async  ( e : FormEvent)  => {
        e.preventDefault();
        if (!name) return;
        if (editId !== null){
            await  updateUser(editId , name);
            setEditId(null);
        }else {
            await createUser(name);
        }

        setName("")
        fetchUser();
};

    const handlingEdit = async (user: User) => {
        setName(user.name);
        setEditId(user.id);
    };

    const handlingDelete = async (id: number) => {
        await deleteUser(id);
        fetchUser();
    };

    return (
        <div>
            <h1>CRUD REACT + AXIOS</h1>
            <form onSubmit={handlingSumbit}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type = "submit">
                    {editId ? "Edit " : "Add "}
                </button>
            </form>
            <hr />

            {user.map((user: User) => (
                <div key={user.id}>
                    {user.name}
                    <button onClick={() => handlingEdit(user)}>Edit</button>
                    <button onClick={() => handlingDelete(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default App;
