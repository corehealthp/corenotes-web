// import { useState } from "react";

// import { useIndividualState } from "src/features/Individual/state";

export default function IndividualServiceFrequency({ userState, setIndividuals }: any) {
  // const [individualState, setIndividualState] = useIndividualState();

 
  return (
    <div className="px-10 flex   flex-col my-6">
      <div className="flex items-center gap-2 ">
        <div className="border border-black rounded-full w-5 h-5 flex items-center justify-center ">
          <label>6</label>
        </div>
        <label className="text-xl ">
          Service Frequency and Discharge Plan:
        </label>
      </div>

      <div className=" grid grid-cols-2 gap-3  mt-2">
        <div className="">
          <div className="flex flex-col mt-2">
            <label htmlFor="Days and frequency of service:   ">
              Days and frequency of service:   
            </label>
            <input
              type="text"
              placeholder="Days and frequency of service:   "
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={userState?.daysOfService}
              onChange={(e) => {
                setIndividuals((state: any) => ({
                  ...state,
                  daysOfService: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor=" Expected frequency of services:	 ">
               Expected frequency of services:  
            </label>
            <input
              type="text"
              placeholder=" Expected frequency of services:	 "
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={userState?.expectedFrequency}
              onChange={(e) => {
                setIndividuals((state: any) => ({
                  ...state,
                  expectedFrequency: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col mt-2">
            <label htmlFor="Discharge Plan: ">Discharge Plan: </label>
            <input
              type="text"
              placeholder="Discharge Plan: "
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={userState?.dischargePlan}
              onChange={(e) => {
                setIndividuals((state: any) => ({
                  ...state,
                  dischargePlan: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="Expected duration of services:">
              Expected duration of services:
            </label>
            <input
              type="text"
              placeholder="Expected duration of services:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={userState?.expectedDurationOfService}
              onChange={(e) => {
                setIndividuals((state: any) => ({
                  ...state,
                  expectedDurationOfService: e.target.value,
                }));
              }}
            />
          </div>
           
        </div>
      </div>
    </div>
  );
}
