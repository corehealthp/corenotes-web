import styles from "./primarytextbutton.module.css";
import TextButton from "../TextButton";

interface PrimaryTextButtonType {
    width?:string,
    extraStyle?:string,
    type?:"button"|"submit"|"reset",
    label:string, 
    isLoading?:boolean, 
    loaderColor?:string, 
    backgroundColor?: string;
    labelColor?:string;
    disabled?:boolean,
    clickAction: ()=> void
}

export default function PrimaryTextButton({ 
    width,
    backgroundColor,
    labelColor,
    type,
    label,
    isLoading,
    disabled,
    clickAction
}:PrimaryTextButtonType) {
    return (
        <TextButton
            extraStyles={styles.primary_text_button}
            type={type}
            width={width}
            label={label}
            isLoading={isLoading}
            disabled={disabled}
            onClick={clickAction} 
            backgroundColor={backgroundColor} 
            labelColor={labelColor}
        />
    );
}