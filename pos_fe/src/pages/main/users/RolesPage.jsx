/* eslint-disable no-unused-vars */
import { FaUserShield, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { TableRole } from "../../../components/main/roles/TableRole";
import { FormAddRole } from "../../../components/main/roles/FormAddRole";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";

export function RolePage() {
  const [roles, setRoles] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchRoles();
    return () => {
      listenToUpdate("role:created", fetchRoles);
      listenToUpdate("role:updated", fetchRoles);
      listenToUpdate("role:deleted", fetchRoles);
    };
  }, []);

  const fetchRoles = async () => {
    try {
      const result = await api.get("/master/roles");
      setRoles(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (val) => {
    try {
      await api.post("/master/role", val);
      showAlert("success", "Add Role Successfully!");
      setOpenModalAdd(false);
    } catch (error) {
      console.log(error);
      showAlert("error", "Add Role failed!");
    }
  };

  return (
    <>
      <div className="max-w-full">
        {/* Title */}
        <div className="title flex font-bold items-center gap-2 mb-4">
          <div className="subTitle flex items-center gap-2 text-3xl">
            <FaUserShield />
            <h1>Manage Roles</h1>
          </div>
          <div className="addRole ms-auto">
            <button
              onClick={() => setOpenModalAdd(true)}
              className="flex gap-1 items-center bg-blue-700 px-4 py-1 rounded-xl text-center text-white hover:bg-blue-800 transition"
            >
              <FaPlus />
              Add Role
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="sm:mt-6">
          <TableRole data={roles} />
        </div>
      </div>

      {/* Modal Add Role */}
      <Modal
        isOpen={openModalAdd}
        title="Add Role"
        onClose={() => setOpenModalAdd(false)}
      >
        <FormAddRole onSubmit={handleAdd} />
      </Modal>
    </>
  );
}
