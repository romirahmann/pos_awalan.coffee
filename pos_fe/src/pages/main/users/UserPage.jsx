/* eslint-disable no-unused-vars */
import { FaEdit, FaUserPlus, FaUsers } from "react-icons/fa";
import { TableUser } from "../../../components/main/users/TableUser";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { FormAddUser } from "../../../components/main/users/FormAddUser";

export function UserPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchRoles(), fetchPositions();
  }, []);

  const fetchUser = async () => {
    try {
      let result = await api.get("/master/users");
      setUsers(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    try {
      let result = await api.get("/master/roles");
      setRoles(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPositions = async () => {
    try {
      let result = await api.get("/master/positions");
      setPositions(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-full">
        <div className="title flex font-bold items-center gap-2 ">
          <div className="subTitle flex items-center gap-2 text-3xl">
            <FaUsers />
            <h1>Manage Users</h1>
          </div>
          <div className="addUser ms-auto">
            <button
              onClick={() => setOpenModalAdd(true)}
              className="flex gap-1 items-center bg-blue-700 px-4 py-1 rounded-xl text-center text-white"
            >
              <FaUserPlus />
              Add User
            </button>
          </div>
        </div>
        <div className="sm:mt-10">
          <div className="">
            <TableUser data={users} roles={roles} positions={positions} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModalAdd}
        title="Add User"
        onClose={() => setOpenModalAdd(false)}
      >
        <FormAddUser roles={roles} positions={positions} />
      </Modal>
    </>
  );
}
