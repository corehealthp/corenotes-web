import styles from "./dropdownfield.module.css"
import { useEffect, useState } from "react";
import useClickOutside from "src/hooks/useClickOutside";
import { FaAngleDown } from "react-icons/fa";
import { DropDownOption, DropDownProps } from "./types";
import FormLabel from "../FormLabel";
import FormInputError from "../FormInputError";
import filterObjectList from "src/utils/filterObjectList";
import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function DropDownField({
    label,
    placeholder,
    options,
    error,
    selected,
    selectedOptionIndex,
    onSelect,
    action,
    relative,
    extraStyle,
    width,
    height,
    bottomOffset,
    showLoading,
    customStyles
}: DropDownProps) {

    const dynamicStyle = {
        width: width || '100%', // Use the provided width or default to '100%'
        height:"100%",
        ...customStyles, // Apply custom styles
      };

    useEffect(()=> {
        setFilteredOptions(options)
    }, [options])

    const domNode = useClickOutside(()=> {
        setSearchKeyword('')
        setFilteredOptions(options)
        setIsOpen(false);
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropOptions = ()=> {
        if(options?.length) setIsOpen(true)
    }
    
    const [searchKeyword, setSearchKeyword] = useState<string>('')
    
    const [filteredOptions, setFilteredOptions] = useState<DropDownOption[]>(options);

    const filterOptions = (filterTxt:string)=> {
        setSearchKeyword(filterTxt)
        const searchResults = filterObjectList(filterTxt, options);
        setFilteredOptions(searchResults)
    }

    const selectOption = (selectedOption:DropDownOption)=> {
        onSelect?.(options.indexOf(selectedOption))
    }

    return (
        <div style={dynamicStyle} className={`${extraStyle} ${styles.container}`} ref={domNode}>
            <FormLabel text={label ?? ""} />
            <div 
                style={{ height, marginBottom: isOpen ?relative ?bottomOffset :undefined :undefined }} 
                className={`
                    ${styles.display}
                    ${isOpen ?styles.is_open :null}
                    ${error ?styles.field_error :null}
                    ${!options?.length ?styles.disable_dropdown :null}
                `}
            >
                {
                    (isOpen)
                    ?   <div className={styles.search_bar_wrapper}>
                            <input
                                type={'text'}
                                placeholder={"Search by keyword"}
                                className={styles.search_bar}
                                onInput={(e:React.ChangeEvent<HTMLInputElement>)=> filterOptions(e.target.value)}
                            />
                        </div>
                    :   (selected)
                        ?   <div className={styles.selected_option} onClick={()=> dropOptions()}>
                                { options[selectedOptionIndex].label }
                                {
                                    showLoading
                                    ?   <ComponentLoader />
                                    :   <FaAngleDown onClick={()=> dropOptions()} />
                                }
                            </div>
                        :   <div className={styles.unselected} onClick={()=> dropOptions()}>
                                <div className={styles.placeholder}>{placeholder}</div>
                                {
                                    showLoading
                                    ?   <ComponentLoader />
                                    :   <FaAngleDown onClick={()=> dropOptions()} />
                                }
                            </div>
                }

                {
                    (isOpen)
                    ?   
                        <div className={styles.options_container}>
                            {
                                (filteredOptions?.length)
                                ?   filteredOptions.map((option, index:number)=> {
                                        if(option.type === 'action-option' && options?.length === 1) {
                                            return  <div 
                                                        key={index} 
                                                        className={styles.action_option} 
                                                    >
                                                        <div 
                                                            className={`
                                                                ${(searchKeyword) ?null : styles.disabled_btn}
                                                                ${styles.action_option_btn}
                                                            `}
                                                            onClick={()=> action?.(searchKeyword)}
                                                        >
                                                            { option.actionIcon }
                                                            { option.label }
                                                        </div>
                                                    </div>         
                                        } 
                                        
                                        
                                        return  <div 
                                                    key={index} 
                                                    className={styles.option} 
                                                    onClick={()=> {
                                                        selectOption(option)
                                                        setIsOpen(false)
                                                    }}
                                                >
                                                    { option.label }
                                                </div>
                                        
                                    })
                                :   
                                    <div>
                                        {
                                            options.map((option, index) => {
                                                return  (option.type === 'action-option') 
                                                        ?   <div 
                                                                key={index} 
                                                                className={styles.action_option} 
                                                            >
                                                                <div 
                                                                    className={styles.action_option_btn}
                                                                    onClick={()=> {
                                                                        if(searchKeyword){
                                                                            action?.(searchKeyword)
                                                                            setIsOpen(false)
                                                                        }
                                                                    }}
                                                                    
                                                                >
                                                                    { option.actionIcon }
                                                                    { option.label }
                                                                </div>
                                                            </div>
                                                        :   null
                                            })
                                        }
                                        <div
                                            className={styles.option}
                                            style={{color:"var(--grey-accent-600)"}}
                                            children={`No result matches the keyword '${searchKeyword}'`}
                                        />
                                    </div>
                            }
                        </div>
                    :   null
                }
            </div>
            <FormInputError message={error} />
        </div>
    );
}