import React, { useState, useEffect } from "react";
import OperarioItem from "../../components/Operarios/itemOperario";
import { getOperarioById } from "../../axios/operarios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OperarioDetailPage() {
  const user = useSelector((state) => state.user);
  const [operario, setOperario] = useState(null);
  const { operarioId } = useParams();
  useEffect(() => {
    const getOperarioByIdFunc = async () => {
      let operarioById = await getOperarioById(user.access_token, operarioId);
      setOperario(operarioById.data.operario);
    };
    getOperarioByIdFunc();
  }, [user.access_token, operarioId]);

  return <div>{operario && <OperarioItem operario={operario} />}</div>;
}

export default OperarioDetailPage;
