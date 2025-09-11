/* PositionPage.jsx */
import { useEffect, useState } from "react";
import { FaBriefcase, FaPlus } from "react-icons/fa";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { TablePosition } from "../../../components/main/positions/TablePosition";
import { FormAddPosition } from "../../../components/main/positions/FormAddPosition";

export function PositionPage() {
  const [positions, setPositions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const result = await api.get("/master/positions");
      setPositions(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-full">
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
              <FaPlus /> Add Position
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
        <FormAddPosition />
      </Modal>
    </>
  );
}
