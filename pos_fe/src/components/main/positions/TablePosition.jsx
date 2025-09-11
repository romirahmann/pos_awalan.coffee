/* TablePosition.jsx */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "../../../shared/Modal";
import { useState } from "react";
// import { FormEditPosition } from "./FormEditPosition";
import { DeleteModal } from "../../../shared/DeletedComponent";

export function TablePosition({ data = [], filter = {} }) {
  const [openModal, setOpenModal] = useState({ edit: false, deleted: false });
  const [selectedData, setSelectedData] = useState(null);

  const columns = [
    { header: "No", key: "no" },
    { header: "Position Name", key: "positionName" },
    { header: "Description", key: "description" },
    {
      header: "Created At",
      key: "createdAt",
      render: (val) => moment(val).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      header: "Updated At",
      key: "updatedAt",
      render: (val) => moment(val).format("DD-MM-YYYY HH:mm:ss"),
    },
    { header: "Action", key: "action" },
  ];

  const handleEdit = (position) => {
    setSelectedData(position);
    setOpenModal({ edit: true });
  };

  const handleDeleted = (position) => {
    setSelectedData(position);
    setOpenModal({ deleted: true });
  };

  const formattedData = data.map((row, index) => ({
    ...row,
    no: index + 1,
    action: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(row)}
          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleted(row)}
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

      {/* Edit Modal */}
      <Modal
        isOpen={openModal.edit}
        title="Edit Position"
        onClose={() => setOpenModal({ edit: false })}
      >
        {selectedData && <FormEditPosition data={selectedData} />}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={openModal.deleted}
        title="Delete Position"
        onClose={() => setOpenModal({ deleted: false })}
      >
        {selectedData && (
          <DeleteModal
            itemName={selectedData.positionName}
            onConfirm={() => {
              console.log("Deleting position:", selectedData.positionName);
              setOpenModal({ deleted: false });
            }}
          />
        )}
      </Modal>
    </>
  );
}
