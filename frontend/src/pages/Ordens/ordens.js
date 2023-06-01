import { useState, useEffect } from "react";
import OrdensList from "../../components/Ordens/listaOrdens";
import { getOrdens } from "../../axios/ordens";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/loading";

function OrdensPage() {
  const user = useSelector((state) => state.user);
  const [ordens, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const response = await getOrdens(user.access_token);
          setOrders(response.data.ordens);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }, 500);
    };

    fetchData();
  }, [user.access_token]);

  return (
    <div>
      {loading ? <Loading /> : ordens && <OrdensList ordens={ordens} />}
    </div>
  );
}

export default OrdensPage;
