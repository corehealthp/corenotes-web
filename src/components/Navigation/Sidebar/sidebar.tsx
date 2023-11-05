import logo from "src/assets/images/logo-with-name.png";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import {sideBarNavOptionsType} from "./types";
import ImageComponent from "src/components/ImageComponent";
import { useUserState } from "src/features/user/state";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { clockStaffInAction, clockStaffOutAction } from "src/features/staff/actions";
import { useState } from "react";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function Sidebar({ navOptions, navigateTo }: sideBarNavOptionsType) {

    const [userState, setUserState] = useUserState();
    const [clockInState, setClockInState] = useState(userState);
    const [clockOutState, setClockOutState] = useState(userState);

    function clockUserIn() {
        const payload = {
            startAt: new Date().toISOString()
        }

        setClockInState(state => ({
            ...state,
            status:"LOADING"
        }))
        
        clockStaffInAction(payload)
        .then((response)=> {
            setUserState(state => {                                                                                         
                const user = response.data.staff;

                return {
                    ...state,
                    status: "FAILED",
                    details: {
                        id: user?.id,
                        active: user.active,
                        role: user.role,
                        lastSeen: user.lastSeen,
                        isClockedIn: user.isClockedIn,
                        personal: {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            profileImage: user.profileImage,
                        }
                    }
                }
            })

            setClockInState(state => ({
                ...state,
                status:"IDLE"
            }))
        })
        .catch((error)=> {
            setClockInState(state => ({
                ...state,
                status:"IDLE"
            }))

            const newFeedback = {
                status: "ERROR",
                message: error.message ?? "There was an error clocking in"
            }

            createGlobalFeedback("error", newFeedback.message);
        })
    }

    function clockUserOut() {
        const payload = {
            endAt: new Date().toISOString()
        }

        setClockOutState(state => ({
            ...state,
            status:"LOADING"
        }))
        
        clockStaffOutAction(payload)
        .then((response)=> {
            setClockOutState(state => ({
                ...state,
                status:"LOADING"
            }))

            setUserState(state => {                                                                                         
                const user = response.data.staff;

                return {
                    ...state,
                    status: "FAILED",
                    details: {
                        id: user?.id,
                        active: user.active,
                        role: user.role,
                        lastSeen: user.lastSeen,
                        isClockedIn: user.isClockedIn,
                        personal: {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            profileImage: user.profileImage,
                        }
                    }
                }
            })
        })
        .catch((error)=> {
            setClockOutState(state => ({ ...state, status:"IDLE" }))

            const newFeedback = {
                status: "ERROR",
                message: error.message ?? "There was an error clocking in"
            }
            
            createGlobalFeedback("error", newFeedback.message);
        })
    }

    return (
        <div className={styles.sidebar}>
            <ImageComponent
                src={logo}
                width={"100px"}
                extraStyles={styles.logo_image}
            />

            <div className={styles.navigation_section}>
                <div className={styles.navigation_bar}>
                    {
                        userState.details.role.title !== "ADMINISTRATOR"
                        ?   userState.details.isClockedIn
                            ?   <PrimaryTextButton
                                    label={"Clock Out"}
                                    isLoading={clockOutState.status === "LOADING"}
                                    clickAction={()=> clockUserOut()}
                                />
                            :   <PrimaryTextButton
                                    label={"Clock In"} 
                                    isLoading={clockInState.status === "LOADING"}
                                    clickAction={()=> clockUserIn()}
                                />
                        :   null
                    }

                    {
                        navOptions.map((navOption, index)=> 
                            navOption.roles?.includes(userState.details.role.title)
                            ?   <Link 
                                    key={index}
                                    to={navOption.path}
                                    className={`${styles.navigation_item} ${(navOption.active) ?styles.active :null}`}
                                    onClick={()=> navigateTo(index)}
                                >
                                        {(navOption.active) ? <navOption.icon className={styles.nav_icon} /> :<navOption.activeIcon className={styles.nav_icon} />}
                                        <div className={styles.nav_label}> <span>{ navOption.label }</span> </div>
                                </Link>
                            :   null
                        )
                    }
                </div> 
            </div>
        </div>
    );
}