
// import { useIndividualState } from "src/features/Individual/state";

export default function IndividualFunctionalLimitations({userState, setIndividuals}:any) {
  // const [individualState, setIndividualState] = useIndividualState();
  
  return (
    <div className="px-10 flex   flex-col my-6">
      <div className="flex items-center gap-2 ">
        <div className="border border-black rounded-full w-5 h-5 flex items-center justify-center ">
          <label>5</label>
        </div>
        <label className="text-xl">
          Functional Limitations or Special Needs
        </label>
      </div>

      <div className=" grid grid-cols-2 gap-3  mt-2">
        <div className="">
         

          <div className="flex flex-col mt-2">
            <label htmlFor="seizure activity">Seizure Activity</label>
            <input type="text" placeholder="Seizure Activity" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.seizureActivity}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                seizureActivity: e.target.value,
              }));
            }}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor=" Hard of Hearing/ Deaf:"> Hard of Hearing/ Deaf:</label>
            <input type="text" placeholder=" Hard of Hearing/ Deaf:" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.hardOfHearing}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                hardOfHearing: e.target.value,
              }));
            }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="Prone to falling?">Prone to falling?</label>
            <input type="text" placeholder="Prone to falling?" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.proneToFalling}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                proneToFalling: e.target.value,
              }));
            }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor=" Weight-bearing limitation"> Weight-bearing limitation:</label>
            <input type="text" placeholder=" Weight-bearing limitation:" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.weightBearingLimitation}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                weightBearingLimitation: e.target.value,
              }));
            }}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="Shortness of breath"> Shortness of breath:</label>
            <input type="text" placeholder=" Shortness of breath:" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.shortnessOfBreath}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                shortnessOfBreath: e.target.value,
              }));
            }}
            />
          </div>
        </div>
        <div className="">
        <div className="flex flex-col mt-2">
            <label htmlFor="Blind, or vision loss:">Blind, or vision loss:</label>
            <input type="text" placeholder="Blind, or vision loss:" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id=""
            value={userState?.visionLoss}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                visionLoss: e.target.value,
              }));
            }}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="Incontinent, Safety:">Incontinent, Safety:</label>
            <input type="text" placeholder="Incontinent, Safety:" 
            className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.incontinentSafety}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                incontinentSafety: e.target.value,
              }));
            }}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="Oxygen">Oxygen</label>
            <input type="text" placeholder="Oxygen" className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id=""
            value={userState?.oxygen}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                oxygen: e.target.value,
              }));
            }}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="Activity limitations:">Activity limitations:</label>
            <input type="text" placeholder="Activity limitations:" className="border border-gray-400 mt-2 outline-blue-500 rounded-md p-3" name="" id="" 
            value={userState?.activityLimitations}

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                activityLimitations: e.target.value,
              }));
            }}
            />
          </div>

           
        </div>
      </div>
    </div>
  );
}
