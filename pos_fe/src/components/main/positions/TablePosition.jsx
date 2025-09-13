/* eslint-disable no-unused-vars */
/* TablePosition.jsx */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "../../../shared/Modal";
import { useState } from "react";
import { FormEditPosition } from "./FormEditPosition";
import { DeleteModal } from "../../../shared/DeletedComponent";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";

export function TablePosition({ data = [], filter = {} }) {
  const [openModal, setOpenModal] = useState({ edit: false, deleted: false });
  const [selectedData, setSelectedData] = useState(null);

  const { showAlert } = useAlert();

  const columns = [
    { header: "No", key: "no" },
    { header: "Position Name", key: "positionName" },
    { header: "Description", key: "description" },

    { header: "Action", key: "action" },
  ];

  // 🔹 Handle Edit
  const handleEdit = async (val) => {
    try {
      await api.put(`/master/position/${selectedData.positionId}`, val);
      showAlert("success", "Edit Position Successfully!");
      setOpenModal((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      console.error(error);
      showAlert("error", "Edit Position Failed!");
    }
  };

  // 🔹 Handle Delete
  const handleDeleted = async () => {
    try {
      await api.delete(`/master/position/${selectedData.positionId}`);
      showAlert("success", "Delete Position Successfully!");
      setOpenModal((prev) => ({ ...prev, deleted: false }));
    } catch (error) {
      console.error(error);
      showAlert("error", "Delete Position Failed!");
    }
  };

  // 🔹 Format Data
  const formattedData = data.map((row, index) => ({
    ...row,
    no: index + 1,
    action: (
      <div className="flex gap-2">
        {/* Edit Button */}
        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal((prev) => ({ ...prev, edit: true }));
          }}
          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
        >
          <FaEdit />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal((prev) => ({ ...prev, deleted: true }));
          }}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
        >
          <FaTrash />
        </button>
      </div>
    ),
  }));

  return (
    <>
      {/* Table */}
      <Table
        data={formattedData}
        columns={columns}
        rowsPerPage={filter.perPage || 10}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={openModal.edit}
        title="Edit Position"
        onClose={() => setOpenModal((prev) => ({ ...prev, edit: false }))}
      >
        <FormEditPosition
          data={selectedData}
          onSubmit={(val) => handleEdit(val)}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={openModal.deleted}
        itemName={"Delete Position"}
        onClose={() => setOpenModal((prev) => ({ ...prev, deleted: false }))}
        onConfirm={(val) => handleDeleted(val)}
      />
    </>
  );
}
