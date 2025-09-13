/* eslint-disable no-unused-vars */
/* TableRole.jsx */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "../../../shared/Modal";
import { useState } from "react";
import { FormAddRole } from "./FormAddRole";
import { FormEditRole } from "./FormEditRole";
import { DeleteModal } from "../../../shared/DeletedComponent";
import { useAlert } from "../../../store/AlertContext";
import api from "../../../services/axios.service";

export function TableRole({ data = [], filter = {} }) {
  const [openModal, setOpenModal] = useState({
    edit: false,
    deleted: false,
  });
  const [selectedData, setSelectedData] = useState(null);
  const { showAlert } = useAlert();
  // Column Table
  const columns = [
    { header: "No", key: "no" },
    { header: "Role Name", key: "roleName" },
    { header: "Description", key: "description" },

    { header: "Action", key: "action" },
  ];

  // ACTIONS
  const handleEdit = async (val) => {
    if (!val) {
      showAlert("error", "New Data not found!");
      return;
    }
    try {
      await api.put(`/master/role/${selectedData.roleId}`, val);
      showAlert("success", "Update Role Successfully!");
      setOpenModal({
        edit: false,
      });
    } catch (error) {
      console.log(error);
      showAlert("error", "Update Role Failed!");
    }
  };

  const handleDeleted = async () => {
    if (!selectedData) {
      showAlert("error", "Not Selected Data!");
      return;
    }
    try {
      await api.delete(`/master/role/${selectedData.roleId}`);
      showAlert("success", "Deleted Role Successfully!");
      setOpenModal({ deleted: false });
    } catch (error) {
      console.log(error);
      showAlert("error", "Deleted Role Failure!");
    }
  };

  // Format data supaya ada "No" & "Action"
  const formattedData = data.map((row, index) => ({
    ...row,
    no: index + 1,
    action: (
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal({ edit: true });
          }}
          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal({ deleted: true });
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
      <Table
        data={formattedData}
        columns={columns}
        rowsPerPage={filter.perPage || 10}
      />

      {/* Edit Role Modal */}
      <Modal
        isOpen={openModal.edit}
        title="Edit Role"
        onClose={() => setOpenModal({ edit: false })}
      >
        {selectedData && (
          <FormEditRole data={selectedData} onSubmit={handleEdit} />
        )}
      </Modal>

      {/* Delete Role Modal */}
      <DeleteModal
        isOpen={openModal.deleted}
        onClose={() => setOpenModal({ deleted: false })}
        onConfirm={() => handleDeleted()}
      />
    </>
  );
}
