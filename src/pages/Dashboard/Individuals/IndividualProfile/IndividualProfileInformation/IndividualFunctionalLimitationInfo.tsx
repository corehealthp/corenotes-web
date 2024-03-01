
import {
  // useIndividualState,
  useIndividualStateValue,
} from "src/features/Individual/state";

export default function IndividualFunctionalLimitationInfo() {
  const IndividualState = useIndividualStateValue();

  return (
    <div className="flex   flex-col mt-2">
      <div className="flex items-center ">
        <label className="text-2xl font-semibold">
          Functional Limitations or Special Needs
        </label>
      </div>

      <div className=" grid grid-cols-2 gap-3 mt-4">
        <div className="">
          <div className="flex flex-col mt-2">
            <label htmlFor="seizure activity">Seizure Activity</label>
            <input
              type="text"
              placeholder="Seizure Activity"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.seizureActivity}
              readOnly
              title="readonly"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor=" Hard of Hearing/ Deaf:">
               Hard of Hearing/ Deaf:
            </label>
            <input
              type="text"
              placeholder=" Hard of Hearing/ Deaf:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.hardOfHearing}
              readOnly
              title="readonly"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="Prone to falling?">Prone to falling?</label>
            <input
              type="text"
              placeholder="Prone to falling?"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.proneToFalling}
              readOnly
              title="readonly"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor=" Weight-bearing limitation">
               Weight-bearing limitation:
            </label>
            <input
              type="text"
              placeholder=" Weight-bearing limitation:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.weigthBearingLimitation}
              readOnly
              title="readonly"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="Shortness of breath"> Shortness of breath:</label>
            <input
              type="text"
              placeholder=" Shortness of breath:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.shortnessOfBreath}
              readOnly
              title="readonly"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col mt-2">
            <label htmlFor="Blind, or vision loss:">
              Blind, or vision loss:
            </label>
            <input
              type="text"
              placeholder="Blind, or vision loss:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.visionLoss}
              readOnly
              title="readonly"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="Incontinent, Safety:">Incontinent, Safety:</label>
            <input
              type="text"
              placeholder="Incontinent, Safety:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.incontinentSafety}
              readOnly
              title="readonly"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="Oxygen">Oxygen</label>
            <input
              type="text"
              placeholder="Oxygen"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.oxygen}
              readOnly
              title="readonly"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="Activity limitations:">Activity limitations:</label>
            <input
              type="text"
              placeholder="Activity limitations:"
              className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3"
              name=""
              id=""
              value={IndividualState.profile.activityLimitations}
              readOnly
              title="readonly"
            />
          </div>
           
        </div>
      </div>
    </div>
  );
}
