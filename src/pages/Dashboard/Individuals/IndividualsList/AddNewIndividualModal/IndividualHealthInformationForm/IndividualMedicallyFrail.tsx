import { useState } from "react";


export default function IndividualMedicallyFrail({ userState,setIndividuals }: any) {
 
  const isMedicallyFrial = userState?.medicallyFrail;
  const [medicallyFrail, setMedicallyFrail] = useState<boolean>(
     isMedicallyFrial==="Yes" ? true : false
  );
  
  
  return (
    <div className="px-10 flex items-center gap-2 my-6">
      <div className="border border-black rounded-full w-5 h-5 flex items-center justify-center ">
        <label>4</label>
      </div>
      <label className="text-xl">Medically Frail</label>
      <div className=" flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="">Yes</label>
          <button
            onClick={() => {
              setMedicallyFrail(true);
              setIndividuals((state: any) => ({
                ...state,
                medicallyFrail: "Yes",
              }));
            }}
            className={` ${
              medicallyFrail
                ? "bg-blue-500 rounded-full border-2 border-black p-[8px]"
                : "rounded-full border-2 border-black p-[8px] "
            }`}
          ></button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="">No</label>
          <button
            onClick={() => {
              setMedicallyFrail(false);
             
              setIndividuals((state: any) => ({
                ...state,
                medicallyFrail: "No",
              }));
            }}
            className={` ${
              !medicallyFrail
                ? "bg-blue-500 rounded-full border-2 border-black p-[8px]"
                : "rounded-full border-2 border-black p-[8px] "
            }`}
          ></button>
        </div>
      </div>
    </div>
  );
}
