import styles from "../ForgotPassword/forgotpassword.module.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextButton from "../../../components/Buttons/TextButton/textbutton";
import InputField from "../../../components/FormComponents/InputField/InputField";
import FormErrorModal from "../../../components/FormError/FormErrorModal";
import { useAuthState } from "../../../features/auth/authAtom";
import { formFieldType } from "src/components/FormComponents/FormWrapper/types";
import PasswordResetSuccess from "../ForgotPassword/components/PasswordResetSuccess";
import { SetNewPasswordAction } from "src/features/auth/actions";

export default function ResetPassword() {
  const [authState, setAuthState] = useAuthState();
  const {token}=useParams()
 const navigate=useNavigate()

  const [RecoverPasswordModel, setRecoverPasswordModel] =
    useState<formFieldType>({
      type: "password",
      label: "New Password",
      value: "",
      error: "",
      validated: false,
    });
  // const [confirmPasswordModel, setConfirmPasswordModel] =
  //   useState<formFieldType>({
  //     type: "password",
  //     label: "Confirm Password",
  //     value: "",
  //     error: "",
  //     validated: false,
  //   });

  const setInput = (inputVal: string, model: any, setModel: any) => {
    model.value = inputVal;
    validateModel(model);
    setModel({ ...model });
  };

  const validateModel = (updatedModel: any) => {
    if (updatedModel.value === "") {
      updatedModel.error = "Field cannot be empty";
      updatedModel.validated = false;
      return false;
    }
    if (updatedModel.value === "") {
      updatedModel.error = "Please enter a username";
      updatedModel.validated = false;
      return false;
    }

    updatedModel.error = "";
    updatedModel.validated = true;
    return true;
  };

  const [isResetSent, setIsResetSent] = useState(false);

  const RecoverPassword = () => {
    if (!validateModel(RecoverPasswordModel)) return false;

    const payload = {
      resetToken:token,
      newPassword: RecoverPasswordModel.value,
    };

    setAuthState((state:any) => {
      return {
        ...state,
        status: "LOADING",
        error: false,
        message: "",
      };
    });

    SetNewPasswordAction(payload)
      .then((data) => {
        console.log(data)
        setAuthState((state:any) => {
          return {
            ...state,
            status: "SUCCESS",
            error: false,
            message: "",
          };
        });
        navigate("/")
      })
      .catch((error) => {
        setAuthState((state:any) => {
          return {
            ...state,
            status: "FAILED",
            error: true,
            message: error.message,
          };
        });
        navigate("/")

      });
  };
  return (
    <div className={styles.container}>
      <FormErrorModal errorState={authState} setErrorState={setAuthState} />

      {!isResetSent ? (
        <div className={styles.recover_email_form_container}>
          <div className={styles.form_title}>
            <div className={styles.title}>Reset Password</div>
            <div className={styles.sub_title}>
              Enter your new password below
            </div>
          </div>

          <form
            className={styles.recover_email_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputField
              type={RecoverPasswordModel.type}
              label={RecoverPasswordModel.label}
              error={RecoverPasswordModel.error}
              onInput={(inputVal: string) =>
                setInput(
                  inputVal,
                  RecoverPasswordModel,
                  setRecoverPasswordModel
                )
              }
            />
<br/>
            {/* <InputField
              type={confirmPasswordModel.type}
              label={confirmPasswordModel.label}
              error={confirmPasswordModel.error}
              onInput={(inputVal: string) =>
                setInput(
                  inputVal,
                  confirmPasswordModel,
                  setConfirmPasswordModel
                )
              }
            /> */}

            <div className={styles.submit_btn_wrapper}>
              <TextButton
                label="Reset Password"
                disabled={!RecoverPasswordModel.validated}
                isLoading={authState.status === "LOADING"}
                onClick={() => RecoverPassword()}
              />
            </div>
          </form>
        </div>
      ) : (
        <PasswordResetSuccess
          email={RecoverPasswordModel.value}
          editEmail={() => setIsResetSent(false)}
          resendLink={() => RecoverPassword()}
        />
      )}

      <Link to="/">
        <div className={styles.back_btn_wrapper}>
          <FaArrowLeft />
          <div>Back to Login</div>
        </div>
      </Link>
    </div>
  );
}
