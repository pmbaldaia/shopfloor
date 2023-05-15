import React, { useState, useEffect } from "react";
import MaterialItem from "../../components/Materiais/itemMaterial";
import { gerMateriais } from "../../axios/materiais";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MaterialDetailPage(params) {
  const user = useSelector((state) => state.user);
  const [material, setMaterial] = useState(null);
  const { materialId } = useParams();
  useEffect(() => {
    gerMateriais(user.access_token, materialId).then((res) => {
      setMaterial(res.data + materialId);
      console.log(materialId);
    });
  }, [user.access_token, materialId]);

  return <div>{material && <MaterialItem material={material} />}</div>;
}

export default MaterialDetailPage;
