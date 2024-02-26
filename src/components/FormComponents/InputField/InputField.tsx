import styles from "./inputfield.module.css";
import FormInputError from "../FormInputError";
import FormLabel from "../FormLabel";
import { useEffect, useState } from "react";

interface inputFieldType {
    type?:"text" | "number" | "password" | "date" | "time" | "email" | "phone",
    label?:string,
    placeholder?:string,
    value?:string,
    autoComplete?:string,
    error:string,
    prefixIcon?:JSX.Element,
    suffixIcon?:JSX.Element,
    suffixAction?: ()=> void,
    readonly?: boolean,
    onInput?:(value:string)=> void,
    extraStyles?: string,
    inputWidth?:string,
    inputContainer?:string,
    extraInputContainerStyle?: string,
    onEnterKeyPressed?: (value:string)=> void
}

export default function selecInputField({
    inputWidth,
    inputContainer,
    type,
    label,
    placeholder,
    value,
    error,
    prefixIcon,
    suffixIcon,
    suffixAction,
    readonly,
    onInput,
    extraInputContainerStyle,
    onEnterKeyPressed
}:inputFieldType) {

    const [internalType, setInternalType] = useState<string>(type === "date" || type === "time" || type === 'text' ?'text' :type!);

    useEffect(()=> {
        if(internalType !== type) setInternalType(type === "date" || type === "time"  || type === 'text' ?'text' :type!)
    }, [internalType, type])

    function handleKeyDown(e:any) {
        if(e.key === 'Enter') {
            onEnterKeyPressed?.(e.target.value)
        }
    }

    return (
        <div className={`${styles.input_field_container}`} style={{width:inputContainer}}>
            <FormLabel text={label ?? ""} />
            
            <div 
                className={`${extraInputContainerStyle} ${styles.input_component} ${readonly ?styles.disabled :null}`}
            >
                
                {   
                    prefixIcon
                    ?   <div 
                            children={prefixIcon}
                            className={` ${styles.prefix_icon} ${styles.input_icon}`}
                        />
                    :   null
                }

                <input  
                    width={inputWidth}
                    type={internalType}
                    className={`${styles.input}`}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readonly}
                    onFocus={()=> { 
                        type === 'date' 
                        ?   setInternalType('date') 
                        :   type === 'time'
                            ?   setInternalType('time')
                            :   null
                    }}
                    onBlur={()=> { 
                        type === 'date' 
                        ?   setInternalType('text') 
                        :   type === 'time'
                            ?   setInternalType('text')
                            :   null
                    }}
                    onChange={(e)=> onInput?.(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {   
                    suffixIcon
                    ?   <div 
                            children={suffixIcon}
                            className={` ${styles.suffix_icon} ${styles.input_icon}`}
                            onClick={suffixAction}
                        />
                    :   null
                }
            </div>

            <FormInputError message={error} />
        </div>
    )
}