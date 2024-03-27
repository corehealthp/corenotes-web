import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaRegEye } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

export default function TaskActionModal({
  isTaskActionOpen,
  setIsTaskActionOpen,
  setIsTaskOpen,
  setIsEditTaskOpen,
  setIsViewTaskOpen
}: // isUserClockInOpen,
any) {
  // let staffState = useStaffValue();

  function closeModal() {
    setIsTaskActionOpen(false);
  }

  return (
    <>
      <Transition appear show={isTaskActionOpen} as={Fragment}>
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
            <div className="flex min-h-full items-center justify-end p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="lg:w-2/12 md:w-3/12 w-full border border-[#ccc] transform overflow-hidden rounded-xl bg-[#ECF4E7] p-4 text-left align-middle shadow-xl transition-all">
                  {/* <div className="flex justify-between items-center">
                    <h3 className="font-bold">Mark Complete</h3>
                    <span>
                      <FaTimes />
                    </span>
                  </div> */}
                  <div className="">
                    <div className="flex flex-col gap-4">
                      <div
                        className="flex gap-2 items-center "
                        onClick={() => {
                            setIsEditTaskOpen(true);
                          setIsTaskActionOpen(false);
                        }}
                      >
                        <BsPencil />
                        <button className="outline-none">Edit</button>
                      </div>
                      <div className="flex gap-2 items-center"
                      onClick={() => {
                        setIsViewTaskOpen(true);
                      setIsTaskActionOpen(false);
                    }}
                      >
                        <FaRegEye />
                        <button className="outline-none">View</button>
                      </div>
                      <div
                        className="flex gap-2 items-center"
                        onClick={() => {
                          setIsTaskOpen(true);
                          setIsTaskActionOpen(false);
                        }}
                      >
                        <IoMdCheckmark />
                        <button className="outline-none">Mark as Completed</button>
                      </div>
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
