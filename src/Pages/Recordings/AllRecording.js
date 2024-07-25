import Recordings from "../../Component/AllRecordings/Recording";
import Slidebar from "../../Component/Slidebar/Slidebar";

function AllRecording() {
    return ( 
        <>
        <div className=" flex  w-full">
                <Slidebar/>
                <div className="w-[100%] ">
                    <Recordings />
                </div>

            </div>
        </>
     );
}

export default AllRecording;