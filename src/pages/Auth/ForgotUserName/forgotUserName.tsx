import styles from '../ForgotPassword/forgotpassword.module.css'
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TextButton from "../../../components/Buttons/TextButton/textbutton";
import InputField from "../../../components/FormComponents/InputField/InputField";
import FormErrorModal from "../../../components/FormError/FormErrorModal";
import { useAuthState } from "../../../features/auth/authAtom";
import { formFieldType } from 'src/components/FormComponents/FormWrapper/types';
import PasswordResetSuccess from '../ForgotPassword/components/PasswordResetSuccess';


export default function ForgotUserName() {
  const [authState, setAuthState] = useAuthState();

  const [RecoverUserNameModel, setRecoverUserNameModel] = useState<formFieldType>({
    type: "text",
    label: "Username",
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
    if ((updatedModel.value) === '') {
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
    if (!validateModel(RecoverUserNameModel)) return false;

    // const payload = {
    //   username: RecoverUserNameModel.value,
    // };

    setAuthState((state) => {
      return {
        ...state,
        status: "LOADING",
        error: false,
        message: "",
      };
    });

    // ResetPasswordAction(payload)
    //   .then((data) => {
    //     setAuthState((state) => {
    //       return {
    //         ...state,
    //         status: "SUCCESS",
    //         error: false,
    //         message: "",
    //       };
    //     });
    //     setIsResetSent(true);
    //   })
    //   .catch((error) => {
    //     setAuthState((state) => {
    //       return {
    //         ...state,
    //         status: "FAILED",
    //         error: true,
    //         message: error.message,
    //       };
    //     });

    //     setIsResetSent(false);
    //   });
  };
  return (
    <div className={styles.container}>
      <FormErrorModal errorState={authState} setErrorState={setAuthState} />

      {!isResetSent ? (
        <div className={styles.recover_email_form_container}>
          <div className={styles.form_title}>
            <div className={styles.title}>Forgot UserName?</div>
            <div className={styles.sub_title}>
              No worries, we'll send reset instructions
            </div>
          </div>

          <form
            className={styles.recover_email_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputField
              type={RecoverUserNameModel.type}
              label={RecoverUserNameModel.label}
              error={RecoverUserNameModel.error}
              onInput={(inputVal: string) =>
                setInput(inputVal, RecoverUserNameModel, setRecoverUserNameModel)
              }
            />

            <div className={styles.submit_btn_wrapper}>
              <TextButton
                label="Reset Password"
                disabled={!RecoverUserNameModel.validated}
                isLoading={authState.status === "LOADING"}
                onClick={() => RecoverPassword()}
              />
            </div>
          </form>
        </div>
      ) : (
        <PasswordResetSuccess
          email={RecoverUserNameModel.value}
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


