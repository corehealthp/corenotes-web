export interface formFieldType {
    type?:"text" | "number" | "password" | "date" | "time" | "email" | "phone",
    optional?:boolean,
    name?:string,
    label?: string,
    placeholder?: string,
    value: string,
    error: string,
    validated: boolean,
    prefixIcon?: JSX.Element,
    suffixIcon?: JSX.Element,
    suffixIconAlt?: JSX.Element,
    readonly?: boolean,
    file?:File,
    image?:Blob|MediaSource
}

export interface setFormFieldType extends React.Dispatch<React.SetStateAction<formFieldType>> {}

export interface formStateType {
    error: string,
    validated: boolean
}

export interface setFormStateType extends React.Dispatch<React.SetStateAction<formStateType>> {}

export function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType, validateModel:(inputModel:formFieldType)=> void) {
    inputModel.value = value
    validateModel(inputModel)
    setInputModel({...inputModel});
}

