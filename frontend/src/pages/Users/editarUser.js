import { useRouteLoaderData } from "react-router-dom";

import UserForm from "../../components/Users/formUser";

function EditUserPage() {
  const data = useRouteLoaderData("user-detail");

  return <UserForm method="patch" operario={data.user} />;
}

export default EditUserPage;
