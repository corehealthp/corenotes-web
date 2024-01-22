import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { staffClockIn, staffClockOut } from "src/features/staff/actions";
import { MdInfoOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { fetchUserProfile } from "src/features/user/actions";

import { useStaffState } from "src/features/staff/state";
import { getFetch } from "src/lib/apiCalls";

interface ClockInData {
  from: string;
  to: string;
  note: string;
  EndAt: string;
  startAt: string;
  staffId: string;
  _id: string;
}

export default function UserClockInModal({
  isUserClockInOpen,
  setIsUserClockInOpen,
}: any) {
  const [staffState, setStaffState] = useStaffState();


  

  let [clockIn, setClockIn] = useState<any>({
    from: "",
    to: "",
    note: "",
  });

  let [loading, setLoading] = useState<any>(false);
  let [loggedInUser, setLoggedInUser] = useState<any>("");

  const staffId: string = localStorage.getItem("user_id") || "";
  const storedDataString: string | null = localStorage.getItem("clockInData");
  const clockInData: ClockInData | null = storedDataString
    ? JSON.parse(storedDataString)
    : null;

  useEffect(() => {
    fetchUserProfile(staffId).then((response) => {
      setLoggedInUser(response?.data?.user);
    });
  }, []);

  const handleClockIn = () => {
    setLoading(true);
    const clockInPayload = {
      staffId: staffId,
      from: clockIn?.from,
      to: clockIn?.to,
      comment: clockIn?.note,
      startAt: new Date(),
    };
    staffClockIn(clockInPayload)
      .then((response: any) => {
        console.log("responseeeee", response?.clockinData);
        setStaffState((state:any) => ({
          ...state,
          details: response?.staffData,
      }))
        localStorage.setItem(
          "clockInData",
          JSON.stringify(response?.clockinData)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleClockOut = () => {
    setLoading(true);
    const clockInPayload = {
      staffId: staffId,
      clockInId: clockInData?._id,
      from: clockInData?.from,
      to: clockInData?.to,
      comment: clockInData?.note,
      EndAt: new Date(),
    };
    staffClockOut(clockInPayload)
      .then((response:any) => {
        setLoading(false);
        setStaffState((state:any) => ({
          ...state,
          details: response?.staffData,
      }))
        localStorage.removeItem("clockInData");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  function closeModal() {
    setIsUserClockInOpen(false);
  }

  //   function openModal() {
  //     setIsUserClockInOpen(true);
  //   }

  useEffect(() => {
    getFetch(`/staffs/profile/${staffId}`).then((response: any) => {
        const staffDetailsResponse = response?.data;
        if (staffDetailsResponse) {
          setStaffState((state) => ({
            ...state,
            status: "SUCCESS",
            details: staffDetailsResponse.staff,
          }));
        }
     
    });
  }, [setStaffState]);
//   useEffect(()=> {
//     if(!staffDetailsResponse.error) {
//         setStaffState((state)=> {
//             return {
//                 ...state,
//                 status: 'SUCCESS',
//                 details: staffDetailsResponse.staff
//             }
//         })
//     } else {
//         setStaffState((state)=> {
//             return {
//                 ...state,
//                 status: 'FAILED',
//                 details: staffDetailsResponse.staff
//             }
//         })
//     }
// }, [setStaffState, staffDetailsResponse, staffState.details])

  return (
    <>
      <Transition appear show={isUserClockInOpen} as={Fragment}>
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
                <Dialog.Panel className="lg:w-4/12 md:w-5/12 w-full  transform overflow-hidden bg-[#fff] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="py-6">
                    <div className="flex  justify-between">
                      <div>
                        <h1 className="font-bold text-2xl">
                          {loggedInUser?.firstname} {loggedInUser?.lastname}
                        </h1>
                        {!staffState.details?.isClockedIn ? (
                          <p className="text-sm">
                            Please Clock in to start your shift
                          </p>
                        ) : (
                          <p className="text-sm">
                            Please Clock out to end your shift
                          </p>
                        )}
                      </div>

                      <p>
                        <IoMdClose />
                      </p>
                    </div>

                    <div className="flex flex-col mt-6">
                      <p className="text-sm font-semibold">Provider Role</p>
                      <input
                        type="text"
                        value={loggedInUser?.role?.title}
                        readOnly
                        className="p-2 outline-none border border-gray-800 rounded "
                      />
                    </div>

                    <div className="flex flex-col mt-4">
                      {/* <p className="text-sm font-semibold">Provider Shift</p> */}

                      {!staffState.details?.isClockedIn ? (
                        <div className=" flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <p className="text-sm font-semibold">Shift From</p>
                            <input
                              type="time"
                              className="p-2 border border-gray-800 rounded "
                              onChange={(e) => {
                                setClockIn({
                                  ...clockIn,
                                  from: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <p className="text-sm font-semibold">Shift To</p>
                            <input
                              type="time"
                              className="p-2 border border-gray-800 rounded "
                              onChange={(e) => {
                                setClockIn({
                                  ...clockIn,
                                  to: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col mt-6">
                      <p className="text-sm font-semibold">Note</p>
                      <textarea
                        onChange={(e) => {
                          setClockIn({
                            ...clockIn,
                            note: e.target.value,
                          });
                        }}
                        className="p-2 border border-gray-800 rounded "
                        cols={5}
                        rows={3}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <MdInfoOutline />
                        <p className="text-xs text-red-600 ">
                          Please leave a note if you clocked in 7 minutes
                          earlier or later
                        </p>
                      </div>
                    </div>

                    {loading ? (
                      <button className="bg-green-600 p-2 rounded outline-none border-none w-full mt-4 text-white">
                        Loading...
                      </button>
                    ) : (
                      <>
                        {!staffState.details?.isClockedIn ? (
                          <button
                            onClick={() => handleClockIn()}
                            className="bg-green-600 p-2 rounded outline-none border-none w-full mt-4 text-white"
                          >
                            Clock In
                          </button>
                        ) : (
                          <button
                            onClick={() => handleClockOut()}
                            className="bg-red-600 p-2 rounded outline-none border-none w-full mt-4 text-white"
                          >
                            Clock Out
                          </button>
                        )}
                      </>
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
