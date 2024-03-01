import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "../individualhealthinformation.module.css";
import { FC, useEffect, useState } from "react";
import {
  useIndividualState,
  // useSetIndividualState,
} from "src/features/Individual/state";
import {
  DropDownFormData,
  // setDropDownFormData,
} from "src/components/FormComponents/DropDownField/types";
// import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { useFetchCompartmentList } from "src/features/compartment/selector";
import { useCompartmentState } from "src/features/compartment/state";
import { getCompartmentDetails } from "src/features/compartment/action";
// import { createGlobalFeedback } from "src/features/globalFeedback/atom";


type Props = {
  userState?:any;
  setIndividuals?:any;
  removeLabel: boolean;

}
const IndividualCompartmentForm: FC<Props> = ({removeLabel,setIndividuals,userState}) => {


  const [individualState, setIndividualState] = useIndividualState();
console.log(individualState)
  const [compartmentState, setCompartmentState] = useCompartmentState();

  const fetchCompartmentListReponse = useFetchCompartmentList(
    compartmentState.currentListPage
  );

  useEffect(() => {
    setCompartmentState((state:any) => ({
      ...state,
      compartmentsList: fetchCompartmentListReponse.list.compartments,
      currentListPage: fetchCompartmentListReponse.list.currentListPage,
      totalListPages: fetchCompartmentListReponse.list.totalListPages,
    }));

    setCompartmentModel((state:any) => ({
      ...state,
      options: compartmentState.compartmentsList.map((compartment) => ({
        id: compartment.id,
        label: `${compartment.title} (${compartment.subCompartmentsCount} - subcompartments)`,
        value: compartment.compartmentId.toString(),
      })),
    }));
  }, [
    compartmentState.compartmentsList,
    fetchCompartmentListReponse,
    setCompartmentState,
  ]);

  const [compartmentModel, setCompartmentModel] = useState<DropDownFormData>({
    label: "",
    name: "compartment",
    placeholder: "Select compartment",
    relative: true,
    error: "",
    options: [],
    selected: false,
    selectedOptionIndex: 0,
  });
console.log(compartmentModel)
  const [subCompartmentModel, setSubCompartmentModel] = useState<any>();

  // function selectOption(
  //   optionIndex: number,
  //   model: DropDownFormData,
  //   setModel: setDropDownFormData
  // ) {
  //   model.value = model.options[optionIndex];
  //   model.selected = true;
  //   model.selectedOptionIndex = optionIndex;
  //   setModel({ ...model });

  //   // if (model.name === "compartment") {
  //   //   setIndividualState((state:any) => ({
  //   //     ...state,
  //   //     newIndividual: {
  //   //       ...state.newIndividual,
  //   //       compartment: model.value!.id,
  //   //       compartmentId: parseInt(model.value!.value!),
  //   //     },
  //   //   }));

  //   //   const compartment = compartmentState.compartmentsList.filter(
  //   //     (compartment) => compartment.id === userState?.personalInformation?.compartment
  //   //   );

  //   //   if (compartment[0]) {
  //   //     getCompartmentDetails(compartment[0].compartmentId)
  //   //       .then((response) => {
  //   //         setSubCompartmentModel((state:any) => ({
  //   //           ...state,
  //   //           selected: false,
  //   //           options: response.data.compartment.subCompartments.map(
  //   //             (subCompartment) => ({
  //   //               id: subCompartment.id,
  //   //               label: subCompartment.title,
  //   //               value: subCompartment.id,
  //   //             })
  //   //           ),
  //   //         }));
  //   //       })
  //   //       .catch((error) => createGlobalFeedback("error", error.message));
  //   //   }
  //   // }

  //   if (model.name === "sub-compartment") {
  //     setIndividualState((state:any) => ({
  //       ...state,
  //       newIndividual: {
  //         ...state.newIndividual,
  //         subCompartmentId: model.value!.id,
  //       },
  //     }));
  //   }
  // }

  const compartment = compartmentState.compartmentsList.filter(
    (compartment) =>
      compartment.id === userState?.compartment
  );

  useEffect(() => {
    
    getCompartmentDetails(parseInt(`${userState?.compartmentId}`)).then((response) => {
        setSubCompartmentModel((state: any) => ({
          ...state,
          selected: false,
          options: response.data.compartment.subCompartments.map(
            (subCompartment) => ({
              id: subCompartment.id,
              label: subCompartment.title,
              value: subCompartment.id,
            })
          ),
        }));
      })
      
  }, [userState?.compartmentId]);

  return (
    <FormWrapper extraStyles={styles.staff_personal_information_form}>
      {removeLabel ? (
        <div></div>
      ) : (
        <div className={styles.heading}>
          <div className={styles.number_circle}>2</div>
          <div className={styles.text}>Compartment</div>
        </div>
      )}

      <div className={removeLabel ? "" : styles.form_content}>
        <div className={styles.row}>
          <div className="px-2 w-full border border-gray-400 rounded ">
            <select
              className="py-4 outline-none rounded text-xl"
              onChange={(e) => {
                const selectedValue = e.target.value; // Get the selected value from the event

                // Split the selected value into an array of compartment and compartmentId
                const [compartment, compartmentId] = selectedValue.split(",");

                // setIndividualState((state: any) => ({
                //   ...state,
                //   newIndividual: {
                //     ...state.newIndividual,
                //     compartment: compartment,
                //     compartmentId: compartmentId,
                //   },
                // }));

                setIndividuals((state: any) => ({
                  ...state,
                  compartment: compartment,
                  compartmentId: compartmentId,

                }));
              }}
            >
              <option value={userState?.compartment || ""}>
                {compartment?.[0]?.title || "Compartment"}
              </option>

              {compartmentState?.compartmentsList?.map((compartment) => {
                return (
                  //@ts-ignore
                  <option
                    key={compartment.id}
                    value={`${compartment.id},${compartment.compartmentId}`}
                  >
                    {compartment?.title}
                   
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-2 w-full border border-gray-400 rounded ">

          

          <select
            className="py-4 outline-none rounded text-xl"
            onChange={(e) => {
              const selectedValue = e.target.value; // Get the selected value from the event

              // Split the selected value into an array of compartment and compartmentId
              const [compartment, compartmentId] = selectedValue.split(",");

              setIndividualState((state: any) => ({
                ...state,
                newIndividual: {
                  ...state.newIndividual,
                  compartment: compartment,
                  compartmentId: compartmentId,
                },
              }));
            }}
          >
            <option value={userState?.compartment || ""}>
              {"Sub Compartment"}
            </option>

            {subCompartmentModel?.options?.map((sub: any) => {
              return (
                //@ts-ignore
                <option key={sub.id} value={sub.id}>
                  {sub?.label}
                </option>
              );
            })}
          </select>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
export default IndividualCompartmentForm
