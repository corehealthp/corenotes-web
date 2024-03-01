import {
  // useIndividualState,
  useIndividualStateValue,
} from "src/features/Individual/state";

export default function IndividualServiceFreq() {
  const IndividualState = useIndividualStateValue();

  return (
    <div className=" flex   flex-col mt-2">
      <div className="flex items-center gap-2 ">

        <label className="text-2xl font-semibold">
          Service Frequency and Discharge Plan:
        </label>
      </div>

      <div className=" grid grid-cols-2 gap-3 mt-2">
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
              value={IndividualState.profile.daysOfService}
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
              value={IndividualState.profile.expectedFrequency}

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
              value={IndividualState.profile.dischargePlan}

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
              value={IndividualState.profile.expectedDurationOfService}

            />
          </div>
           
        </div>
      </div>
    </div>
  );
}
