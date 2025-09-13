/* eslint-disable no-unused-vars */
/* PositionPage.jsx */
import { useEffect, useState } from "react";
import { FaBriefcase, FaPlus } from "react-icons/fa";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { TablePosition } from "../../../components/main/positions/TablePosition";
import { FormAddPosition } from "../../../components/main/positions/FormAddPosition";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";

export function PositionPage() {
  const [positions, setPositions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchPositions();

    // Pasang socket listener
    const unsubscribeCreated = listenToUpdate(
      "position:created",
      fetchPositions
    );
    const unsubscribeUpdated = listenToUpdate(
      "position:updated",
      fetchPositions
    );
    const unsubscribeDeleted = listenToUpdate(
      "position:deleted",
      fetchPositions
    );

    // Cleanup listener saat unmount
    return () => {
      unsubscribeCreated?.();
      unsubscribeUpdated?.();
      unsubscribeDeleted?.();
    };
  }, []);

  const fetchPositions = async () => {
    try {
      const result = await api.get("/master/positions");
      setPositions(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (val) => {
    try {
      await api.post("/master/position", val);
      showAlert("success", "Add Position Successfully!");
      setOpenModalAdd(false);
    } catch (error) {
      console.error(error);
      showAlert("error", "Add Position Failed!");
    }
  };

  return (
    <>
      <div className="max-w-full p-6 space-y-6">
        {/* Title */}
        <div className="title flex font-bold items-center gap-2 mb-4">
          <div className="subTitle flex items-center gap-2 text-3xl">
            <FaBriefcase />
            <h1>Manage Positions</h1>
          </div>
          <div className="addPosition ms-auto">
            <button
              onClick={() => setOpenModalAdd(true)}
              className="flex gap-1 items-center bg-blue-700 px-4 py-1 rounded-xl text-white hover:bg-blue-800 transition"
            >
              <FaPlus />
              Add Position
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="sm:mt-6">
          <TablePosition data={positions} />
        </div>
      </div>

      {/* Modal Add Position */}
      <Modal
        isOpen={openModalAdd}
        title="Add Position"
        onClose={() => setOpenModalAdd(false)}
      >
        <FormAddPosition onSubmit={handleAdd} />
      </Modal>
    </>
  );
}
