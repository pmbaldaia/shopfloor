import React, { useState, useEffect } from "react";
import OrderItem from "../../components/Ordens/itemOrdem";
import { getOrdens } from "../../axios/ordens";
import { useSelector } from "react-redux";

function OrdemDetailPage({ ordemId }) {
  const user = useSelector((state) => state.user);
  const [ordem, setOrdem] = useState(null);

  useEffect(() => {
    getOrdens(user.access_token, ordemId).then((res) => {
      setOrdem(res.data);
    });
  }, [user.access_token, ordemId]);

  return <div>{ordem && <OrderItem ordem={ordem} />}</div>;
}

export default OrdemDetailPage;
