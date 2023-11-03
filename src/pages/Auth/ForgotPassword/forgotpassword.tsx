import styles from "./forgotpassword.module.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TextButton from "../../../components/Buttons/TextButton/textbutton";
import InputField from "../../../components/FormComponents/InputField/InputField";
import FormErrorModal from "../../../components/FormError/FormErrorModal";
import { useAuthState } from "../../../features/auth/authAtom";
import { emailValid } from "../../../utils/emailValidation";
import {  SendOtpAction } from "../../../features/auth/actions";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import { formFieldType } from "src/components/FormComponents/FormWrapper/types";
import { ReactComponent as IconPlusCircle } from "src/assets/icons/icon-plus-circle.svg";

export default function ForgotPassword() {
  const [authState, setAuthState] = useAuthState();

  const [RecoverEmailModel, setRecoverEmailModel] = useState<formFieldType>({
    type: "email",
    label: "Email address",
    value: "",
    error: "",
    validated: false,
  });

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
    if (!emailValid(updatedModel.value)) {
      updatedModel.error = "Please enter a valid email";
      updatedModel.validated = false;
      return false;
    }

    updatedModel.error = "";
    updatedModel.validated = true;
    return true;
  };

  const [isResetSent, setIsResetSent] = useState(false);

  const RecoverPassword = () => {
    if (!validateModel(RecoverEmailModel)) return false;

    const payload = {
      email: RecoverEmailModel.value,
    };

    setAuthState((state) => {
      return {
        ...state,
        status: "LOADING",
        error: false,
        message: "",
      };
    });

    SendOtpAction(payload)
      .then(() => {
        setAuthState((state) => {
          return {
            ...state,
            status: "SUCCESS",
            error: false,
            message: "",
          };
        });
        setIsResetSent(true);
      })
      .catch((error) => {
        setAuthState((state) => {
          return {
            ...state,
            status: "FAILED",
            error: true,
            message: error.message,
          };
        });

        setIsResetSent(false);
      });
  };
  return (
    <div className={styles.container}>
      <FormErrorModal errorState={authState} setErrorState={setAuthState} />

      {!isResetSent ? (
        <div className={styles.recover_email_form_container}>
          <div className={styles.form_title}>
            <div className={styles.title}>Forgot Password?</div>
            <div className={styles.sub_title}>
              Enter your account credentials and we’d send you a reset link.
            </div>
          </div>

          <form
            className={styles.recover_email_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputField
              type={RecoverEmailModel.type!}
              // label={RecoverEmailModel.label}
              prefixIcon={<IconPlusCircle />}
              error={RecoverEmailModel.error}
              onInput={(inputVal: string) =>
                setInput(inputVal, RecoverEmailModel, setRecoverEmailModel)
              }
            />

            <div className={styles.submit_btn_wrapper}>
              <TextButton
                label="Reset Password"
                disabled={!RecoverEmailModel.validated}
                isLoading={authState.status === "LOADING"}
                onClick={() => RecoverPassword()}
              />
            </div>
          </form>
        </div>
      ) : (
        <PasswordResetSuccess
          email={RecoverEmailModel.value}
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


