import {useEffect , useState , FormEvent} from "react";
import { User } from "./types/User";
import { getUser , updateUser , createUser , deleteUser} from "./services/userServices.ts";

function App() {
    const [user , setUser] = useState<User[]>([]);
    const [name ,setName] = useState<string>("");
    const [editId , setEditId] = useState<number |  null>(null);

    const fetchUser = async () => {
        const data = await getUser();
        setUser(data);
    };

    useEffect(() => {
        fetchUser();
    },[]);

    const handlingSumbit = async  ( e : FormEvent)  => {
        e.preventDefault();
        if (!name) return;
    }else {
        await createUser(name);
    }

    setName("")
    fetchUser();
};


const