import React, { useState, useEffect } from "react";
import MaterialItem from "../../components/Materiais/itemMaterial";
import { getMaterialById } from "../../axios/materiais";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UserDetailPage() {
  const user = useSelector((state) => state.user);
  const [material, setMaterial] = useState(null);
  const { materialId } = useParams();

  useEffect(() => {
    const getMaterialByIdFunc = async () => {
      let materialById = await getMaterialById(user.access_token, materialId);
      setMaterial(materialById.data.material);
    };
    getMaterialByIdFunc();
  }, [user.access_token, materialId]);

  return <div>{material && <MaterialItem material={material} />}</div>;
}

export default UserDetailPage;
