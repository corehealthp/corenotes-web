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
  const [loading, setLoading] = useState(false);

  console.log(individualState);

  const [roles, setRoles] = useState<any>();
  const [services, setServices] = useState<any>();
  const [individualService, setIndividualService] = useState<any>({
    category: "",
    service: "",
    serviceId: "",
    frequency: "",
    startDate: "",
    time: "",
    staffId: "",
  });

  function submitForm() {
    // if(validateForm()) {
    setLoading(true);
    const payload: IAddServiceToIndividualPayload = {
      serviceId: individualService.serviceId,
      staffRole: individualService.staffId,
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
        setLoading(false);
      })
      .catch((error) => {
        createGlobalFeedback("error", error.message);
        setLoading(false);
      })
      .finally(() => {
        setIndividualState((state: any) => ({
          ...state,
          status: "IDLE",
        }));
        closeModal();
        setLoading(false);
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
  // const requestedService = services?.filter((service: any) => {
  //   return service.category === "requested";
  // });

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
              <option value="">Provided service</option>
              {/* <option value="requested">Requested Service</option> */}
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
              {providedService?.map((service: any) => {
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
          <button
          onClick={()=>closeModal()}
           className=" p-2   w-[200px] text-[#16ADF5] bg-black]">
            Cancel
          </button>
          {loading ? (
            <button className="text-white bg-[#0f87e3] p-3 shadow-md rounded-lg w-full">
              Please Wait...
            </button>
          ) : (
            <button
              onClick={() => submitForm()}
              className="bg-[#388909] p-2  text-white  w-[200px]"
            >
              Create Service
            </button>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
