import styles from "./addstaffrolemodal.module.css";

import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { useStaffState } from "src/features/staff/state";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useState } from "react";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import InputField from "src/components/FormComponents/InputField";
import { addStaffRoleAction } from "src/features/staff/actions";
// import SelectRolePrivileges from "./SelectRolePrivileges";

import ModalContainer from "src/components/Modal/ModalContainer";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function AddStaffRoleModal({
  
  setShowCreateStaffRolesModal,
  setStaffRoles,
}: {
  setShowCreateStaffRolesModal:any
  setStaffRoles: any;
}) {
  const [staffState, setStaffState] = useStaffState();

  const [roleTitle, setRoleTitle] = useState<formFieldType>({
    type: "text",
    name: "role-title",
    placeholder: "Role title",
    value: "",
    error: "",
    validated: false,
  });

  // const [selectedPrivileges, setSelectedPrivileges] = useState<any>({});

  const closeModal=()=>{
    setShowCreateStaffRolesModal(false)
  }
  function setInput(
    value: string,
    model: formFieldType,
    setModel: setFormFieldType
  ) {
    model.value = value;
    validateModel(model);
    setModel({ ...model });
  }

  function validateModel(model: formFieldType) {
    if (!model.value) {
      model.error = "Field cannot be empty";
      model.validated = false;
      return;
    }

    model.error = "";
    model.validated = true;
    return;
  }

  function submitRole() {
    const payload = {
      title: roleTitle.value!,
      privileges: {},
    };

    setStaffState((state: any) => ({
      ...state,
      status: "LOADING",
      error: false,
      message: "",
    }));

    addStaffRoleAction(payload)
      .then((response) => {
        createGlobalFeedback("success", response.message);
        setStaffState((state: any) => ({
          ...state,
          roles: {
            list: response.data.staffRoles,
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
          },
        }));
        setStaffRoles(response.data.staffRoles);
        setShowCreateStaffRolesModal(false)

      })
      .catch((error) => {
        console.log(error);
        createGlobalFeedback("error", error.message);
        setShowCreateStaffRolesModal(false)

      })
      .finally(() => {
        setStaffState((state) => ({ ...state, status: "IDLE" }));
      setShowCreateStaffRolesModal(false)


      });
  }

  return (
    <ModalContainer>
      <div className={styles.add_staff_role_modal}>
        <div className={styles.header}>
          <div className={styles.titiel}>Administration Management</div>
          <IconCancelCircle
            onClick={() =>
              staffState.status === "LOADING" ? () => ({}) : closeModal()
            }
          />
        </div>

        <div className={styles.body}>
          <InputField
            type={roleTitle.type}
            placeholder={roleTitle.placeholder}
            error={roleTitle.error}
            onInput={(value) => setInput(value, roleTitle, setRoleTitle)}
          />

          {/* <SelectRolePrivileges
            submit={(privileges) => setSelectedPrivileges(privileges)}
          /> */}
        </div>

        <div className={styles.buttons}>
          <PrimaryTextButton
            isLoading={staffState.status === "LOADING"}
            disabled={!roleTitle.validated}
            width={"20%"}
            label="Submit"
            backgroundColor="green"
            clickAction={() => submitRole()}
          />
        </div>
      </div>
    </ModalContainer>
  );
}
