import { Link } from "react-router-dom";


const ContestItem = ({item}) => {
    const {_id, contestName, image, numberOfParticipants, tags, contestDescription} = item;


    return (
        <div className="flex gap-4 border-2 border-slate-300 p-4 space-y-6">
            
            <div className="relative">
            <img className="w-[200px] h-[180px] object-cover"  src={image} alt="" />
            <div className="badge bg-purple-200 absolute top-0 right-0">participants: {numberOfParticipants}</div>
            </div>
            <div className="space-y-3">
                <h3> <span className="font-semibold">Name of the Contest: </span> {contestName}</h3>
                <p><span className="font-semibold">Description: </span>{contestDescription}</p>
                <p><span className="font-semibold">Tags: </span>{tags}</p>
               <Link to={`/contests/${_id}`}>
            <button className="rounded-full bg-purple-400 font-bold py-2 px-3">View Detail</button>
            </Link>
            
                                                           
            </div>
            
        </div>
    );
};

export default ContestItem;