import { useState, useEffect } from "react";
import MaquinasList from "../../components/Maquinas/listaMaquinas";
import { getMaquinas } from "../../axios/maquinas";
import { useSelector } from "react-redux";

function MaquinasPage() {
  const user = useSelector((state) => state.user);
  const [maquinas, setMaquinas] = useState(null);

  useEffect(() => {
    getMaquinas(user.access_token).then((res) => {
      setMaquinas(res.data.maquinas);
    });
  }, []);

  return <div>{maquinas ? <MaquinasList maquinas={maquinas} /> : null}</div>;
}

export default MaquinasPage;
