import styles from "./login.module.css";
import logo from "src/assets/images/logo-with-name.png";
import ImageComponent from "src/components/ImageComponent";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import FormHeading from "src/components/FormComponents/FormHeading";
import SizedBox from "src/components/SizedBox";
import InputField from "src/components/FormComponents/InputField";
import { ReactComponent as IconUser } from "src/assets/icons/icon-user.svg";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField/PasswordInputField";
// import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import { LoginAction } from "src/features/auth/actions";
import { useAuthState } from "src/features/auth/state";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";
import GlobalFeedback from "src/components/GlobalFeedback";
// import ClockInOutModal from "../ClockinOutModal/ClockInOutModal";

export default function Login() {
  // const [showClockInModal, setShowClockInModal] = useState(false);

  const [authState, setAuthState] = useAuthState();
  const [modalTitle, setModalTitle] = useState("");
  const [loginTime, setLoginTime] = useState(new Date());
  const navigate = useNavigate();
  console.log(modalTitle)
  console.log(loginTime)

  const [usernameModel, setUsernameModel] = useState<formFieldType>({
    type: "text",
    label: "Username",
    placeholder: "Username",
    value: "",
    error: "",
    prefixIcon: <IconUser />,
    validated: false,
  });

  const [passwordModel, setPasswordModel] = useState<formFieldType>({
    type: "password",
    label: "Password",
    value: "",
    error: "",
    validated: false,
  });

  const [formStateModel, setFormStateModel] = useState({
    // isLoading: false,
    // isError: false,
    // message: 'The email or password entered does not match',
    validated: false,
    // state:"IDLE",
  });

  function setInput(
    value: string,
    inputModel: formFieldType,
    setInputModel: setFormFieldType
  ) {
    inputModel.value = value;
    validateModel(inputModel);
    setInputModel({ ...inputModel });

    isFormStateValid();
  }

  function showModal(role: string) {
    if (role !== "administrator") {
      // setShowClockInModal(true);
    } else {
      navigate({ pathname: "/dashboard" });
    }
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

  function isFormStateValid() {
    if (!usernameModel.validated || !passwordModel.validated) {
      setFormStateModel((state) => {
        return {
          ...state,
          validated: false,
        };
      });
    } else {
      setFormStateModel((state) => {
        return {
          ...state,
          validated: true,
        };
      });
    }
  }

  function resetFormState() {
    setAuthState((state) => {
      return {
        ...state,
        status: "IDLE",
        error: false,
        message: "",
      };
    });
  }

  function loginInTrigger() {
    if (formStateModel.validated) {
      const payload = {
        username: usernameModel.value ?? "",
        password: passwordModel.value ?? "",
      };

      setAuthState((state) => ({
        ...state,
        status: "LOADING",
      }));

      LoginAction(payload)
        .then(() => {
          setAuthState((state) => {
            return {
              ...state,
              isSignedIn: true,
            };
          });
          const getUserDetailsJSON = localStorage.getItem(
            "user_data"
          ) as string;
          const getUserDetails = JSON.parse(getUserDetailsJSON);
          setModalTitle(
            `${getUserDetails.firstname} ${getUserDetails.lastname}`
          );
          setLoginTime(new Date());
          showModal(getUserDetails.role);
          navigate({ pathname: "/dashboard" });
        })
        .catch((error) => {
          createGlobalFeedback("error", error.message);
        })
        .finally(() => setAuthState((state) => ({ ...state, status: "IDLE" })));
    }
  }

  return (
    <>
      <div className={styles.login_page}>
        <div className={styles.content_section}>
          <GlobalFeedback />

          <ImageComponent
            src={logo}
            width={"100px"}
            extraStyles={styles.logo_image}
          />

          <SizedBox height="50px" />

          <FormWrapper
            extraStyles={styles.form_wrapper}
            state={authState}
            resetState={() => resetFormState()}
          >
            <FormHeading
              heading="Login"
              subheading="If you already have an account registered in the system."
              align="center"
            />
            <div className={styles.input_fields_wrapper}>
              <InputField
                placeholder={usernameModel.placeholder}
                error={usernameModel.error}
                prefixIcon={usernameModel.prefixIcon}
                onInput={(value: string) =>
                  setInput(value, usernameModel, setUsernameModel)
                }
              />

              <PasswordInputField
                placeholder={passwordModel.placeholder}
                error={passwordModel.error}
                onInput={(value: string) =>
                  setInput(value, passwordModel, setPasswordModel)
                }
                showPrefixIcon={true}
              />
            </div>
            <div className={styles.forgot_prompt}>
              <Link to={"/forgot-password"}>Forgot password</Link>
            </div>

            <SizedBox height="50px" />
            <div
              className="bg-green-700 p-3 w-full flex items-center justify-center"
              onClick={() => loginInTrigger()}
            >
              <p className="text-white">Login</p>
            </div>
            {/* <PrimaryTextButton
              label={"Login"}
              isLoading={authState.status === "LOADING"}
              disabled={!formStateModel.validated}
              clickAction={() => loginInTrigger()}
            /> */}
          </FormWrapper>
        </div>
      </div>

      
    </>
  );
}
