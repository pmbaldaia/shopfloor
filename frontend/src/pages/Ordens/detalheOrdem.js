import React, { useState, useEffect } from "react";
import OrderItem from "../../components/Ordens/itemOrdem";
import { getOrdens } from "../../axios/ordens";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OrdemDetailPage(params) {
  const user = useSelector((state) => state.user);
  const [ordem, setOrdem] = useState(null);
  const { ordemId } = useParams();
  useEffect(() => {
    getOrdens(user.access_token, ordemId).then((res) => {
      setOrdem(res.data + ordemId);
      console.log(ordemId);
    });
  }, [user.access_token, ordemId]);

  return <div>{ordem && <OrderItem ordem={ordem} />}</div>;
}

export default OrdemDetailPage;
