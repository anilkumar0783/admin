
import Dashboard from "../../Component/Dashboard/Dashboard";
import NavBar from "../../Component/Slidebar/Navbar";
import Slidebar from "../../Component/Slidebar/Slidebar";

function DashBoard() {

    return (
        <>
            <div className="flex w-full  ">
                <Slidebar/>
                <div className=" w-[85%]">
                    <NavBar />

                    <div className="flex   font-bold flex-wrap mt-5 lg:ms-5 gap-5 max-sm:justify-center">

                        <Dashboard />
                        


                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;