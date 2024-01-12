import { CSSProperties } from "react";

export interface DropDownProps {
    label?:string,
    placeholder?:string,
    options: DropDownOption[],
    value?:{
        id:string,
        label:string,
        value?:string
    },
    error:string
    selected:boolean,
    selectedOptionIndex:number,
    onSelect?:(selectedOptionIndex:number)=> void,
    action?:(inputValue:string)=>  void,
    relative?: boolean,
    extraStyle?: string,
    width?:string,
    height?:string,
    bottomOffset?:string,
    validated?:boolean;
    showLoading?:boolean;
    customStyles?: CSSProperties;
}

export interface DropDownOption {
    id:string, 
    label:string, 
    name?:string, 
    value?:string,
    type?:'action-option'|'option',
    actionIcon?:JSX.Element
}

export interface DropDownFormData extends DropDownProps {
    name:string,
    placeholder?:string
}

export interface setDropDownFormData extends React.Dispatch<React.SetStateAction<DropDownFormData>> {

}