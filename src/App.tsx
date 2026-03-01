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
        <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
            <div className="w-[400px] bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    CRUD React TS + Axios
                </h1>

                <form onSubmit={handlingSumbit} className="flex gap-2 mb-4">
                    <input
                        className="border p-2 flex-1 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nama user"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 rounded"
                        type="submit"
                    >
                        {editId ? "Update" : "Tambah"}
                    </button>
                </form>

                {/* MOBILE VIEW */}
                <div className="md:hidden space-y-3">
                    {user.length === 0 ? (
                        <div className="text-center text-gray-500">Data kosong</div>
                    ) : (
                        user.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white p-4 rounded-lg shadow border"
                            >
                                <div className="text-sm text-gray-500">ID</div>
                                <div className="font-semibold mb-2">{user.id}</div>

                                <div className="text-sm text-gray-500">Nama</div>
                                <div className="font-semibold mb-3">{user.name}</div>

                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 bg-yellow-400 py-1 rounded"
                                        onClick={() => handlingEdit(user)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="flex-1 bg-red-500 text-white py-1 rounded"
                                        onClick={() => handlingDelete(user.id)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden md:block overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-gray-800">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">ID</th>
                            <th className="p-2">Nama</th>
                            <th className="p-2 text-center">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {user.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center p-4">
                                    Data kosong
                                </td>
                            </tr>
                        ) : (
                            user.map((user) => (
                                <tr key={user.id} className="border-t">
                                    <td className="p-2">{user.id}</td>
                                    <td className="p-2">{user.name}</td>

                                    <td className="p-2">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="bg-yellow-400 px-3 py-1 rounded"
                                                onClick={() => handlingEdit(user)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => handlingDelete(user.id)}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
