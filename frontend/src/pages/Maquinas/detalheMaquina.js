import React, { useState, useEffect } from "react";
import MaquinaItem from "../../components/Maquinas/itemMaquina";
import { getMaquinaById } from "../../axios/maquinas";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MaquinaDetailPage() {
  const user = useSelector((state) => state.user);
  const [maquina, setMaquina] = useState(null);
  const { maquinaId } = useParams();
  console.log(maquinaId);
  useEffect(() => {
    const getMaquinaByIdFunc = async () => {
      let maquinaById = await getMaquinaById(user.access_token, maquinaId);
      setMaquina(maquinaById.data.maquina);
    };
    getMaquinaByIdFunc();
  }, [user.access_token, maquinaId]);

  return <div>{maquina && <MaquinaItem maquina={maquina} />}</div>;
}

export default MaquinaDetailPage;
