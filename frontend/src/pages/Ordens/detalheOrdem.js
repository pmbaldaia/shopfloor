import React, { useState, useEffect } from "react";
import OrderItem from "../../components/Ordens/itemOrdem";
import { getOrdemById } from "../../axios/ordens";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OrdemDetailPage() {
  const user = useSelector((state) => state.user);
  const [ordem, setOrdem] = useState(null);
  const { ordemId } = useParams();
  useEffect(() => {
    const getOrdemByIdFunc = async () => {
      let ordemById = await getOrdemById(user.access_token, ordemId);
      setOrdem(ordemById.data.ordem);
    };
    getOrdemByIdFunc();
  }, [user.access_token, ordemId]);

  return <div>{ordem && <OrderItem ordem={ordem} />}</div>;
}

export default OrdemDetailPage;
