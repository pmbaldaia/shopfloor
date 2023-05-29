/* import { useState, useEffect } from "react";
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
 */

/* import { useState, useEffect } from "react";
import OrdensList from "../../components/Ordens/listaOrdens";
import { getOrdens } from "../../axios/ordens";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/loading";

function OrdensPage() {
  const user = useSelector((state) => state.user);
  const [ordens, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdens(user.access_token)
      .then((res) => {
        setOrders(res.data.ordens);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.access_token]);

  return (
    <div>
      {loading ? <Loading /> : ordens && <OrdensList ordens={ordens} />}
    </div>
  );
}

export default OrdensPage; */

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
      }, 1000);
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
