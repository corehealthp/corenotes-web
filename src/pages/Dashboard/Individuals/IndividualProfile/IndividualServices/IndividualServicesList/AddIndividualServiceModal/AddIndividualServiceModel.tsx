import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
// import styles from "./addindividualservicemodel.module.css";
// import IndividualCompartmentForm from "src/pages/Dashboard/Individuals/IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm/IndividualCompartmentForm";
// import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
// import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
// import {
//   DropDownFormData,
//   setDropDownFormData,
// } from "src/components/FormComponents/DropDownField/types";
// import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
// import { useCompartmentState } from "src/features/compartment/state";
// import { getCompartmentDetails, getCompartmentServices } from "src/features/compartment/action";
import {
  IAddServiceToIndividualPayload,
  addServiceToIndividualAction,
} from "src/features/Individual/action";
import { useParams } from "react-router-dom";
// import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
// import InputField from "src/components/FormComponents/InputField";
// import {
//   formFieldType,
//   // setFormFieldType,
// } from "src/components/FormComponents/FormWrapper/types";
// import { getAllProvidedServiceAction } from "src/features/service/action";
// import RowContainer from "src/components/Layout/RowContainer";
import formatTime from "src/utils/formatTime";
// import SizedBox from "src/components/SizedBox";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";
// import ComponentLoader from "src/components/Loaders/ComponentLoader";
import { getFetch } from "src/lib/apiCalls";

export default function AddIndividualServiceModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { individualId } = useParams();

  const [individualState, setIndividualState] = useIndividualState();

  console.log(individualState)
  // const [compartmentState, setCompartmentState] = useCompartmentState();

  // const [serviceTypeModel, setServiceTypeModel] = useState<DropDownFormData>({
  //   name: "service-type",
  //   placeholder: "Service category",
  //   options: [
  //     {
  //       id: "1",
  //       label: "Requested service",
  //       value: "requested-service",
  //     },
  //     {
  //       id: "2",
  //       label: "Provided service",
  //       value: "provided-service",
  //     },
  //   ],
  //   error: "",
  //   selected: false,
  //   selectedOptionIndex: 0,
  // });

  // const [requestedServiceModel, setRequestedServiceModel] =
  //   useState<DropDownFormData>({
  //     name: "requested-service",
  //     placeholder: "Service",
  //     options: [],
  //     error: "",
  //     selected: false,
  //     selectedOptionIndex: 0,
  //   });

  // const [serviceStartDateModel, setServiceStartDateModel] =
  //   useState<formFieldType>({
  //     type: "date",
  //     placeholder: "Start date",
  //     value: "",
  //     error: "",
  //     validated: false,
  //   });

  // const [serviceTimeModel, setServiceTimeModel] = useState<formFieldType>({
  //   type: "time",
  //   placeholder: "Time",
  //   value: "",
  //   error: "",
  //   validated: false,
  // });

  // const [serviceFrequencyModel, setServiceFrequencyModel] =
  //   useState<DropDownFormData>({
  //     name: "service-freq",
  //     placeholder: "How often?",
  //     options: [
  //       {
  //         id: "1",
  //         label: "Daily",
  //         value: "daily",
  //       },
  //       {
  //         id: "2",
  //         label: "Every X Days",
  //         value: "every-x-days",
  //       },
  //       {
  //         id: "3",
  //         label: "Weekly",
  //         value: "weekly",
  //       },
  //       {
  //         id: "4",
  //         label: "Every X Weeks",
  //         value: "every-x-weeks",
  //       },
  //       {
  //         id: "5",
  //         label: "Monthly",
  //         value: "monthly",
  //       },
  //     ],
  //     selected: false,
  //     selectedOptionIndex: 0,
  //     error: "",
  //   });

  // const [serviceFrequencyAttrModel, setServiceFrequencyAttrModel] =
  //   useState<formFieldType>({
  //     readonly: true,
  //     type: "number",
  //     label: "",
  //     placeholder: "",
  //     prefixIcon: <div children={"Every"} />,
  //     value: "",
  //     error: "",
  //     validated: false,
  //   });

  // function setInput(
  //   value: string,
  //   model: formFieldType,
  //   setModel: setFormFieldType
  // ) {
  //   model.value = value;
  //   model.validated = true;
  //   setModel({ ...model });
  //   validateForm();
  // }

  // function selectOption(
  //   optionIndex: number,
  //   model: DropDownFormData,
  //   setModel: setDropDownFormData
  // ) {
  //   model.value = model.options[optionIndex];
  //   model.selected = true;
  //   model.selectedOptionIndex = optionIndex;

  //   // if(model.name === 'requested-service') {
  //   //     if(model.value?.label.toLowerCase().split(' ').join('-') === 'medication-administration') {
  //   //         serviceFrequencyModel.selected = true;
  //   //         setServiceFrequencyModel({...serviceFrequencyModel})

  //   //         serviceFrequencyAttrModel.validated = true;
  //   //         setServiceFrequencyAttrModel({...serviceFrequencyAttrModel})

  //   //         serviceTimeModel.validated = true;
  //   //         setServiceTimeModel({...serviceTimeModel})

  //   //         serviceStartDateModel.validated = true;
  //   //         setServiceStartDateModel({...serviceStartDateModel})

  //   //     } else {
  //   //         serviceFrequencyModel.selected = false;
  //   //         setServiceFrequencyModel({...serviceFrequencyModel})

  //   //         serviceFrequencyAttrModel.validated = false;
  //   //         setServiceFrequencyAttrModel({...serviceFrequencyAttrModel})

  //   //         serviceTimeModel.validated = false;
  //   //         setServiceTimeModel({...serviceTimeModel})

  //   //         serviceStartDateModel.validated = false;
  //   //         setServiceStartDateModel({...serviceStartDateModel})
  //   //     }
  //   // }

  //   // if(model.name === 'service-freq') {
  //   //     if(model.value.value === 'every-x-days') {
  //   //         serviceFrequencyAttrModel.readonly = false;
  //   //         serviceFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"days"} />
  //   //     }
  //   //     if(model.value.value === 'every-x-weeks') {
  //   //         serviceFrequencyAttrModel.readonly = false;
  //   //         serviceFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"weeks"} />
  //   //     }
  //   //     if(!['every-x-weeks', 'every-x-days'].includes(model.value.value!)) {
  //   //         serviceFrequencyAttrModel.readonly = true;
  //   //         serviceFrequencyAttrModel.suffixIcon = undefined
  //   //         serviceFrequencyAttrModel.error = "";
  //   //     }

  //   //     setServiceFrequencyAttrModel(serviceFrequencyAttrModel);
  //   // }

  //   setModel({ ...model });
  //   validateForm();
  // }

  // const [servicesPages, setServicesPages] = useState({
  //   currentPage: 1,
  //   totalPages: 1,
  // });

  // const [isServicesLoading, setIsServicesLoading] = useState(false);

  // useEffect(() => {
  //   if (serviceTypeModel.value?.value?.toLowerCase() === "provided-service") {
  //     setIsServicesLoading(true);

  //     getAllProvidedServiceAction(servicesPages.currentPage)
  //       .then(({ data }) => {
  //         setServicesPages({
  //           currentPage: data.currentPage,
  //           totalPages: data.totalPages,
  //         });

  //         setIndividualState((state: any) => ({
  //           ...state,
  //           status: "IDLE",
  //           error: false,
  //           message: "",
  //         }));

  //         setRequestedServiceModel((state) => ({
  //           ...state,
  //           options: data.services?.map((service) => ({
  //             id: service.id,
  //             label: service.title,
  //             value: service.refName,
  //           })),
  //         }));
  //       })
  //       .catch(() => {
  //         setIndividualState((state: any) => ({
  //           ...state,
  //           status: "FAILED",
  //           error: true,
  //           message: "There was an error fetching provided services list",
  //         }));
  //       })
  //       .finally(() => setIsServicesLoading(false));
  //   }

  //   // if(serviceTypeModel.value?.value?.toLowerCase() === 'requested-service') {
  //   //     if(individualState.newIndividual.compartmentId) {
  //   //         getCompartmentDetails(Number(individualState.newIndividual.compartmentId))
  //   //         .then((response)=> {
  //   //             setCompartmentState(state => ({
  //   //                 ...state,
  //   //                 error: false,
  //   //                 message: '',
  //   //                 compartment: response.data.compartment
  //   //             }))
  //   //         })
  //   //         .catch(()=> {
  //   //             setCompartmentState(state => ({
  //   //                 ...state,
  //   //                 error: true,
  //   //                 compartment: compartmentInitState.compartment
  //   //             }))
  //   //         })
  //   //         .finally(()=> {
  //   //             setIsServicesLoading(true);

  //   //             getCompartmentServices(individualState.newIndividual.compartmentId)
  //   //             .then((compartmentServices)=> {
  //   //                 setRequestedServiceModel(state => ({
  //   //                     ...state,
  //   //                     options: compartmentServices.data.compartmentServices.map(service => ({
  //   //                         id: service.id,
  //   //                         label: service.title,
  //   //                         value: service.refName
  //   //                     }))
  //   //                 }))
  //   //             })
  //   //             .catch(()=> {
  //   //                 setRequestedServiceModel(state => ({ ...state, error:"There was an error fetching compartment services" }))
  //   //             })
  //   //             .finally(()=> setIsServicesLoading(false))
  //   //         })
  //   //     }
  //   // }
  // }, [
  //   compartmentState.compartment.services,
  //   individualId,
  //   individualState.newIndividual.compartmentId,
  //   serviceTypeModel.value?.value,
  //   servicesPages.currentPage,
  //   setCompartmentState,
  //   setIndividualState,
  // ]);

  // const [isFormValidated, setIsFormValidated] = useState(false);

  // function validateForm() {
  //   if (!serviceTypeModel.selected) {
  //     setIsFormValidated(false);
  //     return false;
  //   }

  //   if (!requestedServiceModel.selected) {
  //     setIsFormValidated(false);
  //     // console.log(requestedServiceModel.value!.value!)
  //     return false;
  //   }
  //   if (
  //     individualState.servicesWithTemplate.includes(
  //       requestedServiceModel.value!.value!
  //     )
  //   ) {
  //     if (!serviceFrequencyModel.selected) {
  //       setIsFormValidated(false);
  //       return false;
  //     }

  //     if (
  //       ["every-x-days", "every-x-weeks", "every-x-days"].includes(
  //         serviceFrequencyModel.value?.value ?? ""
  //       )
  //     ) {
  //       if (!serviceFrequencyAttrModel.validated) {
  //         setIsFormValidated(false);
  //         return false;
  //       }
  //     }

  //     if (!serviceStartDateModel.validated) {
  //       console.log("HERE");
  //       setIsFormValidated(false);
  //       return false;
  //     }
  //   }

  //   setIsFormValidated(true);
  //   return true;
  // }



  // function resetFormStateModal() {
  //   setIndividualState((state: any) => ({
  //     ...state,
  //     status: "IDLE",
  //     message: "",
  //     error: false,
  //   }));
  // }
  const [roles, setRoles] = useState<any>();
  const [services, setServices] = useState<any>();
  const [individualService, setIndividualService] = useState<any>({
    category: "",
    service:"",
    serviceId: "",
    frequency: "",
    startDate: "",
    time: "",
    staffId: "",
  });

  function submitForm() {
    // if(validateForm()) {

    const payload: IAddServiceToIndividualPayload = {
      serviceId: individualService.serviceId,
      staffRole:individualService.staffId,
      schedule: null,
    };

    payload["schedule"] = {
      startDate: individualService?.startDate,
      time: formatTime(individualService?.time),
      frequency: individualService?.frequency,
      frequencyAttr: parseInt("4" ?? ""),
    };

    setIndividualState((state: any) => ({
      ...state,
      status: "LOADING",
      message: "",
      error: false,
    }));

    addServiceToIndividualAction(individualId!, payload)
      .then((response) => {
        setIndividualState((state: any) => ({
          ...state,
          services: response.data.individualServices,
        }));

        createGlobalFeedback("success", response.message);
      })
      .catch((error) => createGlobalFeedback("error", error.message))
      .finally(() => {
        setIndividualState((state: any) => ({
          ...state,
          status: "IDLE",
        }));
        closeModal();
      });
    // }
  }


  useEffect(() => {
    getFetch(`/staffs/roles`).then((response: any) => {
      const staffRolesResponse = response?.data;
      if (staffRolesResponse) {
        setRoles(staffRolesResponse);
      }
    });
  }, []);

  useEffect(() => {
    getFetch(`/services/${1}`).then((response: any) => {
      const servicesResponse = response?.data;
      if (servicesResponse) {
        setServices(servicesResponse);
      }
    });
  }, [individualService]);

  const providedService = services?.filter((service: any) => {
    return service.category === "provided";
  });
  const requestedService = services?.filter((service: any) => {
    return service.category === "requested";
  });

  console.log("individualService", individualService);
  console.log("requestedService", requestedService);

  return (
    <ModalContainer contentContainerWidth="500px">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-md font-semibold">Add service to individual</div>
          <IconCancelCircle onClick={() => closeModal()} />
        </div>

        <div className="mt-4">
          <div className="px-4 border border-gray-400 py-2 mt-4 rounded">
            <select
              name=""
              id=""
              className="outline-none w-full"
              onChange={(e) => {
                setIndividualService((state: any) => ({
                  ...state,
                  category: e.target.value,
                }));
              }}
            >
              <option value="">Select Category</option>
              <option value="requested">Requested Service</option>
              <option value="provided">Provided service</option>
            </select>
          </div>

          <div className="px-4 border border-gray-400 py-2 mt-4 rounded">
            <select
              name=""
              id=""
              className="outline-none w-full"
              onChange={(e) => {
                setIndividualService((state: any) => ({
                  ...state,
                  serviceId: e.target.value,
                  
                }));
              }}
            >
              <option value="">Select Service</option>

              {individualService?.category === "requested" &&
                requestedService?.map((service: any) => {
                  return (
                    <option value={service._id}>
                      {service?.title.toUpperCase()}
                    </option>
                  );
                })}

              {individualService?.category === "provided" &&
                providedService?.map((service: any) => {
                  return (
                    <option value={service._id}>
                      {service?.title.toUpperCase()}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="px-4 border border-gray-400 py-2 mt-4 rounded">
          <select
            name=""
            id=""
            className="outline-none w-full"
            onChange={(e) => {
              setIndividualService((state: any) => ({
                ...state,
                frequency: e.target.value,
              }));
            }}
          >
            <option value="">Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="every 3 days">Every 3 Days</option>
            <option value="every 5 days">Every 5 Days</option>
            <option value="every 10 days">Every 10 Days</option>
          </select>
        </div>

        <div className="px-4 border border-gray-400 py-2 mt-4 rounded">
          <select
            className="w-full outline-none "
            onChange={(e) => {
              setIndividualService((state: any) => ({
                ...state,
                staffId: e.target.value,
              }));
            }}
          >
            <option value="">Staff Department</option>

            {roles?.map((role: any) => {
              return (
                <option value={role._id}>{role?.title.toUpperCase()}</option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex flex-col w-full">
            <label htmlFor="">Start Date</label>
            <input
              type="date"
              name=""
              id=""
              className="rounded border border-gray-300 p-2"
              onChange={(e) => {
                setIndividualService((state: any) => ({
                  ...state,
                  startDate: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Time</label>
            <input
              type="time"
              name=""
              id=""
              className="rounded border border-gray-300 p-2"
              onChange={(e) => {
                setIndividualService((state: any) => ({
                  ...state,
                  time: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        <div className="flex  justify-end w-full gap-4 mt-6">
          <button className=" p-2   w-[200px] text-[#16ADF5] bg-gray-200]">
            Cancel
          </button>
          <button onClick={()=>submitForm()} className="bg-[#388909] p-2  text-white  w-[200px]">
            Create Service
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
