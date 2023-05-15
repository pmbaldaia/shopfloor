import React, { useState, useEffect } from "react";
import MaquinaItem from "../../components/Maquinas/itemMaquina";
import { getMaquinas } from "../../axios/maquinas";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MaquinaDetailPage(params) {
  const user = useSelector((state) => state.user);
  const [maquina, setMaquina] = useState(null);
  const { maquinaId } = useParams();
  useEffect(() => {
    getMaquinas(user.access_token, maquinaId).then((res) => {
      setMaquina(res.data + maquinaId);
      console.log(maquinaId);
    });
  }, [user.access_token, maquinaId]);

  return <div>{maquina && <MaquinaItem maquina={maquina} />}</div>;
}

export default MaquinaDetailPage;
