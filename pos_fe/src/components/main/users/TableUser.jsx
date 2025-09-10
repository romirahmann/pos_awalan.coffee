/* eslint-disable no-unused-vars */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "../../../shared/Modal";
import { useState } from "react";
import { FormAddUser } from "./FormAddUser";
import { FormEditUser } from "./FormEditUser";

export function TableUser({
  data = [],
  filter = {},
  roles = [],
  positions = [],
}) {
  const [openModal, setOpenModal] = useState({
    edit: false,
    deleted: false,
  });
  const [selectedData, setSelectedData] = useState([]);

  // Column Table
  const columns = [
    { header: "No", key: "no" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Fullname", key: "fullname" },
    { header: "Role", key: "roleName" },
    { header: "Position", key: "positionName" },
    {
      header: "Status",
      key: "isActive",
      render: (val) =>
        val === 1 ? (
          <p className="text-green-600 rounded-md font-bold ">Active</p>
        ) : (
          <p className="text-red-600 rounded-md  font-bold ">In Active</p>
        ),
    },
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

  //   ACTION
  const handleEdit = async (val) => {};
  const handleDeleted = async (id) => {
    console.log(id);
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
          onClick={() => handleDeleted(row.userId)}
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
      <Modal
        isOpen={openModal.edit}
        title="Edit User"
        onClose={() => setOpenModal({ edit: false })}
      >
        <FormEditUser
          data={selectedData}
          onEdit={handleEdit}
          roles={roles}
          positions={positions}
        />
      </Modal>
    </>
  );
}
