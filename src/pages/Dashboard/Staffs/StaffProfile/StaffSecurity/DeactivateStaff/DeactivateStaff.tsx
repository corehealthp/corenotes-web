import { useState ,useEffect} from "react";
import styles from "./deactivatestaff.module.css";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import { useParams } from "react-router-dom";
import {
  // activateStaffPasswordAction,
  activateStaffProfileAction,
  // deactivateStaffPasswordAction,
  deactivateStaffProfileAction,
  // fetchStaffSuccessResponseType,
} from "src/features/staff/actions";
import { useStaffState } from "src/features/staff/state";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import formatStaff from "src/features/staff/utils/formatStaff";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function DeactivateStaff() {
  const params = useParams();

  const [staffState, setStaffState] = useStaffState();
  const [activateStaffState, setActivateStaffState] = useState(staffState);

  const [isStaffActive, setIsStaffActive] = useState<any>();

  useEffect(() => {
    setIsStaffActive(staffState?.details?.active)
  }, [isStaffActive])
  
  
  const [userPassword, setUserPassword] = useState<formFieldType>({
    type: "password",
    label: "Enter password",
    placeholder: "Enter Password",
    value: "",
    error: "",
    validated: false,
  });

  function setInput(
    value: string,
    inputModel: formFieldType,
    setInputModel: setFormFieldType
  ) {
    inputModel.value = value;
    validateModel(inputModel);
    setInputModel({ ...inputModel });

    validateForm();
  }

  function validateModel(updatedInputModel: formFieldType) {
    if (!updatedInputModel.value) {
      updatedInputModel.validated = false;
      updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
      return;
    }

    updatedInputModel.validated = true;
    updatedInputModel.error = "";
    return;
  }

  const [isFormValid, setIsFormValid] = useState(false);

  function validateForm() {
    if (!userPassword.validated) {
      setIsFormValid(false);
      return false;
    }

    setIsFormValid(true);
    return true;
  }

  // function deactivateStaff() {
  //     const payload = {
  //         password: userPassword.value!
  //     }

  //     setActivateStaffState(state => {
  //         return {
  //             ...state,
  //             error: false,
  //             status: 'LOADING',
  //             message: ''
  //         }
  //     })

  //     deactivateStaffPasswordAction(params.staffId!, payload)
  //     .then((response:fetchStaffSuccessResponseType)=> {
  //         setActivateStaffState(state => {
  //             return {
  //                 ...state,
  //                 error: false,
  //                 status: 'SUCCESS',
  //                 message: response.message
  //             }
  //         })

  //         setStaffState(state => {
  //             return {
  //                 ...state,
  //                 details: formatStaff(response.data.staff),
  //                 error: false,
  //                 status: 'SUCCESS'
  //             }
  //         })

  //         setIsStaffActive(response.data.staff.active)
  //     })
  //     .catch((error)=> {
  //         setActivateStaffState(state => {
  //             return {
  //                 ...state,
  //                 error: true,
  //                 status: 'FAILED',
  //                 message: error.message
  //             }
  //         })
  //     })
  // }

  function deactivateStaff() {
         const payload = {
          password: userPassword.value!
      }
    setActivateStaffState((state:any) => {
      return {
        ...state,
        error: false,
        status: "LOADING",
        message: "",
      };
    });

    deactivateStaffProfileAction(params.staffId!,payload)
      .then((response) => {
        setActivateStaffState((state:any) => {
          return {
            ...state,
            error: false,
            status: "SUCCESS",
            message: response.message,
          };
          
        })
        createGlobalFeedback("success", response.message);
        
        
        setStaffState((state:any) => {
          return {
            ...state,
            details: formatStaff(response.data.staff),
            error: false,
            status: "SUCCESS",
          };
        });

        setIsStaffActive(response.data.staff.active);
      })
      .catch((error) => {
        setActivateStaffState((state:any) => {
          return {
            ...state,
            error: true,
            status: "FAILED",
            message: error.message,
          };
        });
      });
  }
  function activateStaff() {
    const payload = {
              password: userPassword.value!
          }
    setActivateStaffState((state:any) => {
      return {
        ...state,
        error: false,
        status: "LOADING",
        message: "",
      };
    });

    activateStaffProfileAction(params.staffId!,payload)
      .then((response) => {
        setActivateStaffState((state:any) => {
          return {
            ...state,
            error: false,
            status: "SUCCESS",
            message: response.message,
          };
        }
        
        )
        createGlobalFeedback("success", response.message);
        setStaffState((state:any) => {
          return {
            ...state,
            details: formatStaff(response.data.staff),
            error: false,
            status: "SUCCESS",
          };
        });

        setIsStaffActive(response.data.staff.active);
        console.log('inactive',response.data.staff.active)
      })
      .catch((error) => {
        setActivateStaffState((state:any) => {
          return {
            ...state,
            error: true,
            status: "FAILED",
            message: error.message,
          };
        });
      });
  }

//   function activateStaff() {
//     const payload = {
//       password: userPassword.value!,
//     };

//     setActivateStaffState((state:any) => {
//       return {
//         ...state,
//         error: false,
//         status: "LOADING",
//         message: "",
//       };
//     });

//     activateStaffPasswordAction(params.staffId!, payload)
//       .then((response: fetchStaffSuccessResponseType) => {
//         setActivateStaffState((state:any) => {
//           return {
//             ...state,
//             error: false,
//             status: "SUCCESS",
//             message: response.message,
//           };
//         });

//         setStaffState((state:any) => {
//           return {
//             ...state,
//             details: {
//               ...state.details,
//               active: response.data.staff.active,
//             },
//           };
//         });

//         setIsStaffActive(response.data.staff.active);
//       })
//       .catch((error) => {
//         setActivateStaffState((state:any) => {
//           return {
//             ...state,
//             error: true,
//             status: "FAILED",
//             message: error.message,
//           };
//         });
//       });
//   }

  return (
    <div className={styles.account_reset}>
      <div className={styles.left}>
        <div className={styles.heading}>
          {isStaffActive===true ? "Deactivate staff" : "Activate staff"}
        </div>
        <div className={styles.sub_heading}>
          Enter your admin password to activate staff
        </div>
      </div>

      <FormWrapper
        state={activateStaffState}
        resetState={() =>
          setActivateStaffState({
            ...activateStaffState,
            status: "IDLE",
            error: false,
          })
        }
        extraStyles={styles.right}
      >
        <PasswordInputField
          placeholder={userPassword.placeholder}
          error={userPassword.error}
          onInput={(value: string) =>
            setInput(value, userPassword, setUserPassword)
          }
        />

        {isStaffActive ? (
          <FadedBackgroundButton
            label="Deactivate staff"
            disabled={!isFormValid}
            backgroundColor={"var(--red-accent-faded-100)"}
            labelColor={"var(--red-accent-100)"}
            isLoading={activateStaffState.status === "LOADING"}
            action={() => deactivateStaff()}
          />
        ) : (
          <PrimaryTextButton
            label="Activate staff"
            disabled={!isFormValid}
            backgroundColor="green"
            
            isLoading={activateStaffState.status === "LOADING"}
            clickAction={() => activateStaff()}
          />
        )}
      </FormWrapper>
    </div>
  );
}
