import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import InputField from "../InputField";
import {ReactComponent as IconLock} from "src/assets/icons/icon-lock.svg"
import {ReactComponent as IconEyeSlash} from "src/assets/icons/icon-eye-slash.svg"
import { formFieldType } from "../../FormWrapper/types";

interface passwordInputFieldType {
    label?:string,
    value:string,
    showPrefixIcon?:boolean,
    error:string,
    placeholder?:string,
    onInput: (value:string)=> void
}

export default function PasswordInputField({
    label,
    value,
    showPrefixIcon,
    error, 
    placeholder,
    onInput
}:passwordInputFieldType) {
                
    const [passwordModel, setPasswordModel] = useState<formFieldType>({
        type: "password",
        value: value,
        label: label,
        placeholder: placeholder ?? "Password",
        error: error,
        prefixIcon: showPrefixIcon ? <IconLock /> :undefined,
        suffixIcon: <IconEyeSlash />,
        suffixIconAlt: <FaEye className="font-icon" />,
        validated: false
    });

    const togglePasswordVisibility = ()=> {
        passwordModel.type = (passwordModel.type === 'password') ?'text' :'password';
        [passwordModel.suffixIcon, passwordModel.suffixIconAlt] = [passwordModel.suffixIconAlt, passwordModel.suffixIcon]
        setPasswordModel({...passwordModel});
    }

    useEffect(()=> {
        setPasswordModel((state)=> {
            return {
                ...state,
                value: value
            }
        })
    }, [value])

    return (
        <InputField 
            type={passwordModel.type}
            label={passwordModel.label}
            value={passwordModel.value}
            placeholder={passwordModel.placeholder}
            error={error}
            prefixIcon={passwordModel.prefixIcon}
            suffixIcon={passwordModel.suffixIcon}
            suffixAction={ ()=> togglePasswordVisibility() }
            onInput={(inputValue:string)=> onInput(inputValue)} 
        />
    );
}