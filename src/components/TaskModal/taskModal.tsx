import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";
import { patchFetch } from "src/lib/apiCalls";
import CapitalizeSentence from "src/utils/capitalizeSentence";

export default function TaskModal({
  isTaskOpen,
  setIsTaskOpen,
  patient,
  setTasks,
}: // isUserClockInOpen,
any) {
  // let staffState = useStaffValue();

  function closeModal() {
    setIsTaskOpen(false);
  }
  const [loading, setLoading] = useState(false);
  const markCompleted = () => {
    setLoading(true);
    patchFetch(
      `/individuals/${patient?.individualId}/services/${patient?.serviceId}`,
      {
        status: "completed",
      }
    )
      .then((response: any) => {
        console.log("response", response);
        setTasks(response?.data?.data);
        createGlobalFeedback("success", response?.data?.message);
        setLoading(false);
        setIsTaskOpen(false)
      })
      .catch((error:any) => {
        createGlobalFeedback("error", error);
        setLoading(false);
        setIsTaskOpen(false)
      });
  };

  return (
    <>
      <Transition appear show={isTaskOpen} as={Fragment}>
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
                <Dialog.Panel className="lg:w-3/12 md:w-4/12 w-full border border-[#ccc] transform overflow-hidden rounded-2xl bg-[#ECF4E7] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Mark Complete</h3>
                    <span>
                      <FaTimes />
                    </span>
                  </div>
                  <div className="mt-6">
                    <label htmlFor="" className="text-sm">
                      Has this Patient(
                      {CapitalizeSentence(
                        patient?.firstname + " " + patient?.lastname
                      )}
                      ) been attended to by a staff?
                    </label>
                    <div className="flex items-center gap-3 w-full mt-4">
                      <button
                        onClick={() => closeModal()}
                        className="text-red-600 p-3 shadow-lg rounded-lg w-full border border-gray-200"
                      >
                        No
                      </button>

                      {loading ? (
                        <button className="text-white bg-[#0f87e3] p-3 shadow-md rounded-lg w-full">
                          Please Wait...
                        </button>
                      ) : (
                        <button
                          className="text-white bg-[#0f87e3] p-3 shadow-md rounded-lg w-full"
                          onClick={() => markCompleted()}
                        >
                          Yes
                        </button>
                      )}
                    </div>
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
