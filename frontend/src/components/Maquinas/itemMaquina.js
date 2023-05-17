import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Pencil, Trash } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";

function MaquinaItem({ maquina }) {
  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>IMAGEM</th>
            <th>FABRICANTE</th>
            <th>DATA AQUISIÇÃO</th>
            <th>ÚLTIMA MANUTENÇÃO</th>
            <th>PRÓXIMA MANUTENÇÃO</th>
            <th>TIPO</th>
            <th>MODELO</th>
            <th>ESTADO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{maquina.id}</td>
            <td>{maquina.nome}</td>
            <td>
              <img src={maquina.imagem} />
            </td>
            <td>{maquina.fabricante}</td>
            <td>{maquina.data_aquisicao}</td>
            <td>{maquina.ultima_manutencao}</td>
            <td>{maquina.proxima_manutencao}</td>
            <td>{maquina.tipo}</td>
            <td>{maquina.modelo}</td>
            <td>{maquina.estado}</td>
            <td>
              <span>
                <Link to="editar">
                  <Pencil size={28} weight="light" />
                </Link>
                &nbsp; &nbsp;
                <Link>
                  <Trash size={28} weight="light" />
                </Link>
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default MaquinaItem;
