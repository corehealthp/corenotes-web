import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./staffprofile.module.css";
import { Suspense, useEffect, useState } from "react";
import StaffProfileNavigation from "./StaffProfileNavigation/StaffProfileNavigation";
import { useStaffState } from "src/features/staff/state";
import { useFetchStaffSelector } from "src/features/staff/selector";
import { FaAngleLeft } from "react-icons/fa";
import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function StaffProfile() {

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    
    const [navItems, setNavItems] = useState([
        {
            label: 'Profile Information',
            path: '',
            active: isCurrentPath('' || params.staffId!)
        },
        {
            label: 'Shifts',
            path: 'shifts',
            active: isCurrentPath('shifts')
        },
        {
            label: 'Documents',
            path: 'documents',
            active: isCurrentPath('documents')
        },
        {
            label: 'Activities',
            path: 'activities',
            active: isCurrentPath('activities')
        },
        {
            label: 'Reports',
            path: 'reports',
            active: isCurrentPath('reports')
        },
        {
            label: 'Security',
            path: 'security',
            active: isCurrentPath('security')
        }
    ])

    function isCurrentPath(activePath:string) {
        const locationWithoutTrailingSLash:string = location.pathname.replace(/\/+$/, "");
        const allPaths:string[] = locationWithoutTrailingSLash.split('/')

        const currentPath:string = allPaths[allPaths.length-1];

        if(currentPath === activePath) return true
        if(!activePath) return params.id === currentPath

        return false
    }

    function changeNav(index:number) {
        navItems.forEach(navItem => navItem.active = false);
        navItems[index].active = true;
        
        try {
            setNavItems([...navItems]);
        }
        finally {
            navigate({pathname: navItems[index].path});
        }
    }

    const [staffState, setStaffState] = useStaffState();

    const staffDetailsResponse = useFetchStaffSelector(params.staffId!)

    useEffect(()=> {
        if(!staffDetailsResponse.error) {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'SUCCESS',
                    details: staffDetailsResponse.staff
                }
            })
        } else {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'FAILED',
                    details: staffDetailsResponse.staff
                }
            })
        }
    }, [setStaffState, staffDetailsResponse, staffState.details])

    return (
        <div className={styles.staff_profile}>
            
            <FaAngleLeft 
                className={styles.back_button} 
                onClick={()=> navigate({pathname: '/dashboard/staffs'})}
            />

            <div className={styles.heading}>Staff Profile</div>

            {
                staffDetailsResponse.error
                ?   <div className={styles.network_error}>Staff profile not found</div>
                :   <div className={styles.main}>
                        <StaffProfileNavigation 
                            navItems={navItems} 
                            changeNav={(index:number)=> changeNav(index)}  
                        />

                        <Suspense fallback={<ComponentLoader />}>
                            <div className={styles.content}>
                                <Outlet />
                            </div>
                        </Suspense>
                    </div>
            }
        </div>
    )
}