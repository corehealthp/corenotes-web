import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffworkinformationform.module.css";
// import InputField from "src/components/FormComponents/InputField";
import { 
  // Suspense, 
  useEffect, 
  // useState 
} from "react";
// import {
//   formFieldType,
//   setFormFieldType,
// } from "src/components/FormComponents/FormWrapper/types";
import { useStaffState } from "src/features/staff/state";
// import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
// import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
// import {
//   DropDownFormData,
//   setDropDownFormData,
// } from "src/components/FormComponents/DropDownField/types";
// import { useFetchStaffRoleSelector } from "src/features/staff/selector";
import { INewStaffWorkInformation } from "src/features/staff/types";
// import ComponentLoader from "src/components/Loaders/ComponentLoader";
// import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import { getFetch } from "src/lib/fetch";

export default function StaffWorkInformationForm({
  // userState,
  // onModified,
  staff,
  setStaff,
  edit,
}: {
  edit?: boolean;
  staff: any;
  setStaff: any;
  userState?: any;
  onModified?: (newStaffDetails: INewStaffWorkInformation) => void;
}) {
  const [staffState, setStaffState] = useStaffState();

  // const staffRolesResponse = useFetchStaffRoleSelector(
  //   staffState.roles.currentPage
  // );

  // useEffect(() => {
  //   setStaffState((state) => ({
  //     ...state,
  //     status: "IDLE",
  //     error: staffRolesResponse.error,
  //     roles: {
  //       list: staffRolesResponse.data.staffRoles,
  //       currentPage: staffRolesResponse.data.currentPage,
  //       totalPages: staffRolesResponse.data.totalPages,
  //     },
  //   }));

  //   setProviderRoleModel((state) => ({
  //     ...state,
  //     options: [
  //       ...staffRolesResponse.data.staffRoles.map((role) => ({
  //         id: role.id,
  //         label: role.title,
  //         value: role.id,
  //       })),
  //     ],
  //   }));
  // }, [setStaffState, staffRolesResponse]);
  // const userRole: any = staffRolesResponse?.data?.staffRoles.filter((role) => {
  //   return role?.id === userState?.providerRole;
  // }) || [{ title: "MD" }];
  // const [providerRoleModel, setProviderRoleModel] = useState<DropDownFormData>({
  //   name: "provider-role",
  //   placeholder: userRole[0]?.title || "Provider Role",
  //   options: [],
  //   selected: false,

  //   selectedOptionIndex: 0,
  //   error: "",
  // });

  // const [usernameModel, setUsernameModel] = useState<formFieldType>({
  //   type: "text",
  //   label: "Username",
  //   placeholder: "Username",
  //   value: "",
  //   error: "",
  //   validated: false,
  // });

  // const [scheduleTypeModel, setScheduleTypeModel] = useState<DropDownFormData>({
  //   name: "schedule-type",
  //   label: "Schedule Type",
  //   placeholder: userState?.jobSchedule || "Job Schedule",
  //   options: [
  //     {
  //       id: "1",
  //       label: "Fulltime",
  //       value: "fulltime",
  //     },
  //     {
  //       id: "1",
  //       label: "Part time",
  //       value: "parttime",
  //     },
  //   ],
  //   selected: false,
  //   selectedOptionIndex: 0,
  //   error: "",
  // });
  // const [hireDateModel, setHireDateModel] = useState<formFieldType>({
  //   type: "date",
  //   label: "Hire date",
  //   placeholder: "Hire date",
  //   value: userState?.hiredAt,
  //   error: "",
  //   validated: false,
  // });

  // const [passwordModel, setPasswordModel] = useState<formFieldType>({
  //   type: "password",
  //   label: "Password",
  //   placeholder: "Password",
  //   value: staffState?.newStaff?.work?.password,
  //   error: "",
  //   validated: false,
  // });

  // function setInput(
  //   value: string,
  //   inputModel: formFieldType,
  //   setInputModel: setFormFieldType
  // ) {
  //   inputModel.value = value;
  //   // validateModel(inputModel);
  //   setInputModel({ ...inputModel });

  //   submitStaffDetails();
  // }

  // function validateModel(updatedInputModel: formFieldType) {
  //   console.log(updatedInputModel)
  //   // if (!updatedInputModel.value) {
  //   //   updatedInputModel.validated = false;
  //   //   updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
  //   //   return;
  //   // }

  //   // updatedInputModel.validated = true;
  //   // updatedInputModel.error = "";
  //   // return;
  // }

  // function selectOption(
  //   optionIndex: number,
  //   model: DropDownFormData,
  //   setModel: setDropDownFormData
  // ) {
  //   model.value = model.options[optionIndex];
  //   model.selected = true;
  //   model.selectedOptionIndex = optionIndex;

  //   setModel({ ...model });
  //   submitStaffDetails();
  // }

  // function submitStaffDetails() {
  //   const staffWorkInfo: INewStaffWorkInformation = {
  //     providerRole: providerRoleModel?.value?.value ?? "",
  //     hiredAt: hireDateModel?.value,
  //     jobSchedule: scheduleTypeModel?.value?.value ?? "",
  //     username: usernameModel?.value,
  //     password: usernameModel?.value,
  //   };
  //   //@ts-ignore
  //   onModified(staffWorkInfo);
  // }

  useEffect(() => {
    getFetch(`/staffs/roles`).then((response: any) => {
      const staffRolesResponse = response;
      if (staffRolesResponse) {
        setStaffState((state) => ({
          ...state,
          status: "SUCCESS",
          // list: staffRolesResponse,
          roles: {
            ...state.roles,
            list: staffRolesResponse,
          },
        }));
      }
    });
  }, []);

  const roleTitle = staffState.roles?.list.filter((role) => {
    return role._id === staff?.providerRole;
  });
  return (
    <FormWrapper extraStyles={styles.staff_personal_information_form}>
      <div className={styles.heading}>
        <div className={styles.number_circle}>2</div>
        <div className={styles.text}>Work information</div>
      </div>

      <div className={styles.form_content}>
        <div className={styles.row}>
          <div className="px-2 w-1/3 border border-gray-400 rounded">
            <select
              className=" py-4 outline-none "
              onChange={(e) => {
                setStaff((state: any) => ({
                  ...state,
                  jobSchedule: e.target.value,
                }));
              }}
            >
              <option value={staff?.jobSchedule || ""}>
                {staff?.jobSchedule || "Job Schedule"}
              </option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
            </select>
          </div>
          <div className="px-2 w-1/3 border border-gray-400 rounded ">
            <select
              className="py-4 outline-none rounded"
              onChange={(e) => {
                setStaff((state: any) => ({
                  ...state,
                  providerRole: e.target.value,
                }));
              }}
            >
              <option value={staff.providerRole}>
                {roleTitle?.[0]?.title.toUpperCase()}
              </option>

              {staffState.roles?.list?.map((role) => {
                return (
                  <option value={role._id}>{role?.title.toUpperCase()}</option>
                );
              })}
            </select>
          </div>
          <input
            title="Hire Date"
            type="date"
            className="w-6/12 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.hiredAt}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                hiredAt: e.target.value,
              }));
            }}
          />

          {/* <Suspense fallback={<ComponentLoader />}>
            <DropDownField
              placeholder={providerRoleModel.placeholder}
              options={providerRoleModel.options}
              selected={providerRoleModel.selected}
              selectedOptionIndex={providerRoleModel.selectedOptionIndex}
              error={providerRoleModel.error}
              onSelect={(optionIndex: number) =>
                selectOption(
                  optionIndex,
                  providerRoleModel,
                  setProviderRoleModel
                )
              }
            />
          </Suspense>

          <InputField
            type={hireDateModel.type}
            placeholder={hireDateModel.placeholder}
            value={hireDateModel.value}
            error={hireDateModel.error}
            onInput={(inputValue: string) =>
              setInput(inputValue, hireDateModel, setHireDateModel)
            }
          /> */}
        </div>

        {edit ? (
          ""
        ) : (
          <div className={styles.row}>
            <input
              placeholder="Username"
              className="w-6/12 border border-gray-400 px-3 py-4 outline-none rounded"
              value={staff?.username}
              onChange={(e) => {
                setStaff((state: any) => ({
                  ...state,
                  username: e.target.value,
                }));
              }}
            />
            <input
              placeholder="Password"
              type="password"
              autoComplete="off"
              className="w-6/12 border border-gray-400 px-3 py-4 outline-none rounded"
              value={staff?.password}
              onChange={(e) => {
                setStaff((state: any) => ({
                  ...state,
                  password: e.target.value,
                }));
              }}
            />
          </div>
        )}
      </div>
    </FormWrapper>
  );
}
