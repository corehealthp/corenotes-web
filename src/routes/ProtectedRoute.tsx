import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import PageLoader from "src/components/Loaders/PageLoader";
import { useSetUserState } from "src/features/user/state";
import { useAuthStateValue } from "src/features/auth/state";
import { fetchUserProfile } from "src/features/user/actions";

export default function ProtectedRoute({children}:{children:JSX.Element}) {

    const authState = useAuthStateValue();
    
    const setUserState = useSetUserState();

    const navigate = useNavigate();

    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        fetchUserProfile()
        .then((data)=> {
            const user = data.data.user;

            setUserState(state => ({
                ...state,
                details: {
                    id: user.id,
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
            }))
        })
        .catch((error)=> {
            console.log(error)
            navigate({ pathname:'/' })
        })
        .finally(()=> setIsLoading(false))

    }, [authState.isSignedIn, location.pathname, navigate, setUserState])


    if(isLoading) return <PageLoader />
    else return children
}