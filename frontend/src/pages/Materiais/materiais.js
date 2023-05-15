import { useState, useEffect } from "react";
import MateriaisList from "../../components/Materiais/listaMateriais";
import { getMateriais } from "../../axios/materiais";
import { useSelector } from "react-redux";

function MateriaisPage() {
  const user = useSelector((state) => state.user);
  const [materiais, setMateriais] = useState(null);

  useEffect(() => {
    getMateriais(user.access_token).then((res) => {
      setMateriais(res.data.materiais);
    });
  }, []);

  return (
    <div>{materiais ? <MateriaisList materiais={materiais} /> : null}</div>
  );
}

export default MateriaisPage;
