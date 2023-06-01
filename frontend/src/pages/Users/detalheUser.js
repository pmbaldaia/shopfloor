import React, { useState, useEffect } from "react";
import UserItem from "../../components/Users/itemUser";
import { getUserById } from "../../axios/users";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UserDetailPage() {
  const user = useSelector((state) => state.user);
  const [User, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const getUserByIdFunc = async () => {
      let userById = await getUserById(user.access_token, userId);
      setUser(userById.data.user);
    };
    getUserByIdFunc();
  }, [user.access_token, userId]);

  return <div>{User && <UserItem User={User} />}</div>;
}

export default UserDetailPage;
