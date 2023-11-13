import { useUserStateValue } from "src/features/user/state";
import Page404 from "src/pages/Page404/Page404";

export default function Authorize({child, roles}:{child:JSX.Element, roles:string[]}) {
    
    const userState = useUserStateValue()

    console.log("userState",userState.details.role.title)
    console.log("role",roles)
    if(!roles?.includes(userState.details.role.title)) return <Page404 />;
    return child
}

