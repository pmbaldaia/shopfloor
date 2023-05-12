import { useState, useEffect } from "react";
import OperariosList from "../../components/Operarios/listaOperarios";
import { getOperarios } from "../../axios/operarios";
import { useSelector } from "react-redux";

function OperariosPage() {
  const user = useSelector((state) => state.user);
  const [operarios, setOperarios] = useState(null);

  useEffect(() => {
    getOperarios(user.access_token).then((res) => {
      setOperarios(res.data.operarios);
    });
  }, []);

  return (
    <div>{operarios ? <OperariosList operarios={operarios} /> : null}</div>
  );
}

export default OperariosPage;
