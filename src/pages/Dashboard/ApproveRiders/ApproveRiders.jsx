import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { FaE, FaEye, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.Email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is to set to ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "Approved");
  };

  const handleRejct = (rider) => {
    updateRiderStatus(rider, "Rejcted");
  };

  return (
    <div className="bg-white">
      <h2 className="text-5xl ">Riders Pending Approval:{riders.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.Email}</td>
                <td>
                  <p
                    className={`${rider.status === "Approved" ? "text-green-800" : "text-red-500"}`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>{rider.District}</td>
                <td>
                  <button className="btn btn-sm ">
                    <FaEye></FaEye>
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-sm "
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>

                  <button
                    onClick={() => handleRejct(rider)}
                    className="btn btn-sm"
                  >
                    <IoPersonRemove></IoPersonRemove>
                  </button>
                  <button className="btn btn-sm ">
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
