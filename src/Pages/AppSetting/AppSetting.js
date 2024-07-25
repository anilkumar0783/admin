import Setting from "../../Component/Settings/Setting";
import Slidebar from "../../Component/Slidebar/Slidebar";

function AppSetting() {
    return ( 
        <>
        <div className="flex w-full">
            <Slidebar/>
            <div className="w-[100%]">
                <Setting/>
            </div>

        </div>
        </>
     );
}

export default AppSetting;