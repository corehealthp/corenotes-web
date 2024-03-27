import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { getFetch } from "src/lib/fetch";
import CapitalizeSentence from "src/utils/capitalizeSentence";

export default function ViewTaskModal({
  patient,
  isViewTaskOpen,
  setIsViewTaskOpen,
}: any) {
  const [roles, setRoles] = useState<any>();
  const [services, setServices] = useState<any>();
  const convertTo24HourFormat = (time12h: any) => {
    return moment(time12h, ["h:mmA"]).format("HH:mm");
  };

  const [individualService, setIndividualService] = useState<any>({
    category: "provided",
    service: "",
    serviceId: "",
    frequency: "",
    startDate: "",
    time: "",
    staffId: "",
    status: "",
  });
  console.log(patient);

  useEffect(() => {
    getFetch(`/services/${1}`).then((response: any) => {
      const servicesResponse = response;
      if (servicesResponse) {
        setServices(servicesResponse);
      }
    });
  }, [patient, isViewTaskOpen]);
  useEffect(() => {
    setIndividualService((state: any) => ({
      ...state,
      serviceId: patient?.serviceId,
      service: patient?.serviceType,
      frequency: patient?.schedule?.frequency,
      startDate: patient?.schedule?.startDate,
      time: convertTo24HourFormat(patient?.schedule?.time),
      staffId: patient?.staffRole,
      status: patient?.status,
    }));
  }, [patient, isViewTaskOpen]);

  useEffect(() => {
    getFetch(`/staffs/roles`).then((response: any) => {
      const staffRolesResponse = response;
      if (staffRolesResponse) {
        setRoles(staffRolesResponse);
      }
    });
  }, [patient, isViewTaskOpen,]);

//   const providedService = services?.filter((service: any) => {
//     return service.category === "provided";
//   });
  console.log("providedService", services);
  console.log("providedService", roles);

  function closeModal() {
    setIsViewTaskOpen(false);
  }


  return (
    <>
      <Transition appear show={isViewTaskOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="lg:w-[37%] md:w-5/12 w-full border border-[#ccc] transform overflow-hidden rounded-2xl bg-[#ECF4E7] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">
                      View Individual(
                      {CapitalizeSentence(
                        patient?.firstname + " " + patient?.lastname
                      )}
                      ) Service
                    </h3>

                    <span onClick={() => closeModal()}>
                      <FaTimes />
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Service Type</label>
                    <div className="px-4 border border-gray-400 py-2 rounded">
                      <select
                        name=""
                        id=""
                        className="outline-none w-full bg-transparent"
                      >
                        <option value="">
                          {patient?.serviceType?.toUpperCase()}
                        </option>
                       
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="">Frequency</label>

                    <div className="px-4 border border-gray-400 py-2  rounded">
                      <select
                        name=""
                        id=""
                        className="outline-none w-full bg-transparent"
                      >
                        <option value="">{patient?.schedule?.frequency}</option>
                        
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="">Staff Department</label>

                    <div className="px-4 border border-gray-400 py-2  rounded">
                      <select className="w-full outline-none bg-transparent">
                        <option value="">{patient?.staffTitle}</option>

                       
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="">Start Date</label>
                      <input
                        type="date"
                        name=""
                        id=""
                        value={individualService?.startDate}
                        readOnly
                        className="rounded border border-gray-300 p-2"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="">Time</label>
                      <input
                        type="time"
                        name=""
                        value={individualService?.time}
                        readOnly
                        id=""
                        className="rounded border border-gray-300 p-2"
                      />
                    </div>
                  </div>

                  <div className="flex  justify-end w-full gap-4 mt-6">
                    <button
                      onClick={() => closeModal()}
                      className="bg-[#388909] p-2  text-white  w-[200px]"
                    >
                      Close Modal
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
