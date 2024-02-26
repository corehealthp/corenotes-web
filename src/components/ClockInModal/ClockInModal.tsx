import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Clock from "../../assets/images/clock.png";
import { useStaffValue } from "src/features/staff/state";

export default function ClockInModal({
  isClockInOpen,
  setIsClockInOpen,
  // isUserClockInOpen,
  setIsUserClockInOpen,
}: any) {
  
  let staffState=useStaffValue()

  function closeModal() {
    setIsClockInOpen(false);
  }


  const handleClockIn = () => {
    setIsUserClockInOpen(true);
    closeModal();
  };

  const handleClockOut = () => {
    setIsUserClockInOpen(true);
    closeModal();
  };

  

  return (
    <>
      <Transition appear show={isClockInOpen} as={Fragment}>
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
                  <div>
                    <div className="flex items-center justify-center gap-3">
                      <img src={Clock} className="w-12 h-12" />

                      {!staffState.details?.isClockedIn ? (
                        <div>
                          <h1 className="font-bold text-xl">Clock in</h1>
                          <p>Clock in to start your shift</p>
                        </div>
                      ) : (
                        <div>
                          <h1 className="font-bold text-xl">Clock out</h1>
                          <p>Clock out to end your shift</p>
                        </div>
                      )}
                    </div>

                    {!staffState.details?.isClockedIn ? (
                      <button
                        onClick={() => handleClockIn()}
                        className="text-white bg-green-600 p-2 w-full rounded-md mt-6"
                      >
                        Clock In
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClockOut()}
                        className="text-white bg-red-600 p-2 w-full rounded-md mt-6"
                      >
                        Clock Out
                      </button>
                    )}
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
