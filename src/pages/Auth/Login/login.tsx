import styles from "./login.module.css";
import logo from "src/assets/images/logo-with-name.png";
import ImageComponent from "src/components/ImageComponent";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import FormHeading from "src/components/FormComponents/FormHeading";
import SizedBox from "src/components/SizedBox";
import InputField from "src/components/FormComponents/InputField";
import { ReactComponent as IconUser } from "src/assets/icons/icon-user.svg";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField/PasswordInputField";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import {LoginAction} from "src/features/auth/actions";
import { useAuthState } from "src/features/auth/state";

export default function Login() {
  const navigate = useNavigate();

  const [authState, setAuthState] = useAuthState();

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

      setAuthState((state) => {
        return {
          ...state,
          status: "LOADING",
        };
      });

      LoginAction(payload)
        .then(() => {
          localStorage.setItem("sid.set", "true");

          setAuthState(() => {
            return {
              error: false,
              message: "",
              status: "SUCCESS",
              isSignedIn: true,
            };
          });
          navigate({ pathname: "/dashboard" });
        })
        .catch((error) => {
          setAuthState((state) => {
            return {
              ...state,
              error: true,
              message: error.message,
              status: "FAILED",
            };
          });
        });
    }
  }

  return (
    <div className={styles.login_page}>
      <div className={styles.content_section}>
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
            <Link to={"/forgot-username"}>Forgot username</Link>
            <Link to={"/forgot-password"}>
              Forgot password
            </Link>
          </div>

          <SizedBox height="50px" />
          <PrimaryTextButton
            label={"Login"}
            isLoading={authState.status === "LOADING"}
            disabled={!formStateModel.validated}
            clickAction={() => loginInTrigger()}
          />
        </FormWrapper>
      </div>
    </div>
  );
}
