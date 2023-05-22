import { useState, useEffect } from "react";
import UsersList from "../../components/Users/listaUsers";
import { getUsers } from "../../axios/users";
import { useSelector } from "react-redux";

function UsersPage() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers(user.access_token).then((res) => {
      setUsers(res.data.users);
    });
  }, [user.access_token]);

  return <div>{users ? <UsersList users={users} /> : null}</div>;
}

export default UsersPage;
