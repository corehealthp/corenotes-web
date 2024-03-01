import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./individualprofile.module.css";
import { Suspense, useEffect, useState } from "react";
import { useSetIndividualState } from "src/features/Individual/state";
import { useFetchIndividualSelector } from "src/features/Individual/selector";
import IndividualProfileNavigation from "./IndividualProfileNavigation";
import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function IndividualProfile() {

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    
    const [navItems, setNavItems] = useState([
        {
            label: 'Profile Information',
            path: '',
            active: isCurrentPath('' || params.individualId!)
        },
        {
            label: 'Services',
            path: 'services',
            active: isCurrentPath('services')
        },
        {
            label: 'Assessments',
            path: 'assessments',
            active: isCurrentPath('assessments')
        },
        {
            label: 'Documents',
            path: 'documents',
            active: isCurrentPath('documents')
        },
        {
            label: 'Reports',
            path: 'reports',
            active: isCurrentPath('reprt')
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

    const { individualId } = useParams();

    const setIndividualState = useSetIndividualState();

    const individualProfileResponse = useFetchIndividualSelector(individualId!)
 
    useEffect(()=> {
        setIndividualState((state:any)=> {
            return {
                ...state,
                error: individualProfileResponse.error,
                message: individualProfileResponse.message,
                profile: individualProfileResponse.individual
            }
        })

        return ()=> {
            setIndividualState((state:any)=> {
                return {
                    ...state,
                    status: 'IDLE',
                    error: false
                }
            })
        }
    }, [setIndividualState, individualProfileResponse])

    return (
        <div className={styles.staff_profile}>
            <div className={styles.heading}>Individual Profile</div>

            <div className={styles.main}>
                <IndividualProfileNavigation 
                    navItems={navItems} 
                    changeNav={(index:number)=> changeNav(index)}  
                />

                <Suspense fallback={<ComponentLoader />}>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </Suspense>
            </div>
        </div>
    )
}