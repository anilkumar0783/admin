import Users from "../../Component/AllUser/User";
import Slidebar from "../../Component/Slidebar/Slidebar";

function AllUsers() {
    return (
        <>
            <div className=" flex  w-full">
                <Slidebar />
                <div className="w-[100%] ">
                    <Users />   
                </div>

            </div>
        </>
    );
}

export default AllUsers;