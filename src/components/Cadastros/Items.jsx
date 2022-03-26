import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useItems } from "../../context/ItemsContext";

import "./cadastro.style.scss";

const ItemsCadastro = () => {
  const { items, insertItem, deleteItem, updateItem, idTipo, tiposAg } =
    useItems();
  const [nameItem, setNameItem] = useState("");
  const [item, setItem] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const filteredItems = items.filter((item) => item.id_tipo === idTipo);

  // const { insertItems } = useItems()

  function getTipoName(id) {
    const name = tiposAg.filter((tp) => tp.id === id);
    return name[0].name;
  }

  function handleUpdate(item) {
    setIsUpdating(true);
    setNameItem(item.description);
    setItem(item);
  }

  function save() {
    if (!nameItem) {
      return alert(`Preencha a sala!`);
    } else {
      const item = {
        description: nameItem,
        id_tipo: idTipo,
      };
      insertItem(item);
      setNameItem("");
    }
  }

  function update() {
    const sala = { ...item };
    sala.description = nameItem;
    updateItem(sala);
    setNameItem("");
    setIsUpdating(false);
  }

  function remove(id) {
    if (!id) {
      return alert(`Selecione uma sala!`);
    } else {
      deleteItem(id);
      alert("Sala excluída!");
    }
  }

  return (
    <div className="container-fluid alto">
      <div className="box">
        <div className="mb-3">
          <h4>Cadastro de {getTipoName(idTipo)}</h4>
        </div>
        <div className="col-12">
          <form>
            <div className="mb-3 row">
              <label htmlFor="sala" className="form-label col-1 py-2 p-3">
                Descrição
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  id="car"
                  name="car"
                  value={nameItem}
                  onChange={(e) => setNameItem(e.target.value)}
                />
              </div>
              <div className="col-1">
                {!isUpdating ? (
                  <button
                    type="button"
                    onClick={() => save()}
                    className="btn btn-primary"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => update()}
                    className="btn btn-primary"
                  >
                    Atualizar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div className=" container-fluid table-responsive rolagem ">
        <table className="table align-middle table-sm table-striped">
          <thead /* className="bg-dark text-light" */>
            <tr>
              <th className="text-center">#</th>
              <th>Descrição</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td>Nada a exibir</td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-dark"
                        style={{ marginRight: "1rem" }}
                        onClick={() => handleUpdate(item)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => remove(item.id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsCadastro;
