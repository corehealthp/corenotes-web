const DdpOversightReview = () => {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col ">
            <label htmlFor="">Beginning Time:</label>
            <input
              type="time"
              name=""
              id=""
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Date of Visit:</label>
            <input
              type="date"
              name=""
              id=""
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Is there a current ISP on-site? </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Are there appropriate community activities?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is there a Behavior support plan in place, and if so, is it being
              followed?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is the Individual's weight, skin integrity, etc.… appropriate?
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Has the individual been educated on each medication?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Is the HRST Data Tracking Log documented? </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Has the individual had any infections? </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Have there been any accidents/incidents since the last visit?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is any equipment (wheelchair or other equipment) in good working
              order?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              PBSP - Is there a Positive Behavioral Support Plan? (If none,
              enter N/A){" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              PBSP - Is the PBSP adequate for the intensity of the targeted
              behavior? (If the individual does not have a PBSP, mark N/A.) Have
              there been any medical or unplanned MD or ER visits this month:{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              What follow-up is needed: Describe any immediate actions taken:{" "}
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Name of staff person on duty: </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col ">
            <label htmlFor="">Ending Time:</label>
            <input
              type="time"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="">Location of service delivery: </label>
            <input
              type="time"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Are goals documented? </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is there evidence that the Individual was given a choice in the
              activities?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is the Individual satisfied with the services they are receiving?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              If health tracking is needed, is it being done?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Are medications stored safely (No expired or discontinued meds on
              site, meds are locked, meds needing refrigeration are in the
              refrigerator){" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is the environment safe? Are there safety concerns such as falls
              or poisoning?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">
              Is there any evidence of abuse, neglect, exploitation, or other
              rights violations?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Have there been any serious or unusual events since the last
              visit?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is the communication/interaction effective between the individual
              and others?{" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              PBSP - Have the staff been educated on the Individual's Plan? (If
              none, enter N/A){" "}
            </label>

            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Medical or Behavioral Concerns: </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="">Is this a face-to-face visit?</label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="">Purpose of the visit:</label>

            <div className="">
              <select
                name=""
                id=""
                className="w-full border border-gray-300 outline-none p-2 mt-2 rounded-md"
              >
                <option value="Assessment or Evaluation">
                  Assessment or Evaluation
                </option>
                <option value="Training">Training</option>
                <option value="Plan for intervention and any changes in service delivery">
                  Plan for intervention and any changes in service delivery
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col ">
            <label htmlFor="">
              Are the ISP goals appropriate and measurable? (If not,
              appropriately state what action has been taken){" "}
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Are identified risk factors addressed?</label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is the Individual's personal appearance appropriate?
            </label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Does MAR and prescriptions match: Allergies, diagnoses, staff
              initials, signatures, and title on MAR?
            </label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Is there adequate staff for the needs of the individual?
            </label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Are fire drills being completed?</label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Are there any accessibility or barrier issues?
            </label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Does the individual feel safe?</label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              What is the individual doing during the time of your visit? What
              was their response:
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">
              PBSP - Has the staff been educated on the individual's crisis
              plan? If the individual does not have a PBSB, mark N/A
            </label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Are medical services adequate to prevent unplanned doctor and ER
              visits? If not, specify:    
            </label>

            <div className="flex gap-5 mt-4">
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <button className="border-blue-500 border rounded-full p-[6px]"></button>
                <label htmlFor="Yea">No</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">
              Additional items discussed with staff or individual? : 
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="Comment"
              className="border border-gray-300 outline-none p-2 mt-2 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex  justify-end w-full gap-4 mt-20">
        <button className=" p-2  rounded-md w-[120px] border border-[#0F87E3]">
          Cancel
        </button>
        <button className="bg-[#388909] p-2 rounded-md text-white  w-[120px]">
          Save
        </button>
      </div>
    </div>
  );
};

export default DdpOversightReview;
