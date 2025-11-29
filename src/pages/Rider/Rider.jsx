import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  // explore useMemo, useCallback
  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has submitted. We will reatch to you in 14 days",
          showConfirmButton: false,
          timer: 2500,
        });
    });
  };

  const districtByRegion = (region) => {
    const regionDistrics = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistrics.map((d) => d.district);
    return districts;
  };

  return (
    <div>
      <h2 className="text-4xl">Be a Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4 text-black"
      >
        {/* two column*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info*/}

          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Rider Details</h4>
              {/* sender name*/}
              <label className="label">Rider Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Rider Name"
              />
              {/* sender email*/}
              <label className="label">Rider Email</label>
              <input
                type="email"
                {...register("Email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Rider Email"
              />
              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Region</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">District</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a District"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender address*/}
              <label className="label mt-4">Your Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Your Address"
              />
              {/* sender Phone*/}
              <label className="label mt-4">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className="input w-full"
                placeholder="Phone"
              />
            </fieldset>
          </div>
          {/* receiver info*/}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            {/* receiver name*/}
            <label className="label">Driving Licence</label>
            <input
              type="text"
              {...register("license")}
              className="input w-full"
              placeholder="Driving Licence"
            />
            {/* receiver email*/}
            <label className="label">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
            />

            {/* bike*/}
            <label className="label mt-4">Bike</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full"
              placeholder="Bike"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value="Apply Rider"
          className="btn btn-primary text-secondary mt-4"
        />
      </form>
    </div>
  );
};

export default Rider;
