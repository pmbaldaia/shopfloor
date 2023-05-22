import { useState, useEffect } from "react";
import OrdensList from "../../components/Ordens/listaOrdens";
import { getOrdens } from "../../axios/ordens";
import { useSelector } from "react-redux";

function OrdensPage() {
  const user = useSelector((state) => state.user);
  const [ordens, setOrders] = useState(null);

  useEffect(() => {
    getOrdens(user.access_token).then((res) => {
      setOrders(res.data.ordens);
    });
  }, [user.access_token]);

  return <div>{ordens ? <OrdensList ordens={ordens} /> : null}</div>;
}

export default OrdensPage;
