

const ContestItem = ({item}) => {
    const {contestName, image, numberOfParticipants, tags, contestDescription} = item;


    return (
        <div className="flex gap-4 border-2 border-slate-300 p-4 space-y-6">
            
            <div className="relative">
            <img className="w-[200px] h-[180px] object-cover"  src={image} alt="" />
            <div className="badge  absolute top-0 right-0 bg-slate-400">{numberOfParticipants}</div>
            </div>
            <div className="space-y-3">
                <h3> <span className="font-semibold">Name of the Contest:</span> {contestName}</h3>
                <p><span className="font-semibold">Description:</span>{contestDescription}</p>
                <p><span className="font-semibold">Tags:</span>{tags}</p>
               
            <button className="rounded-full bg-purple-400 font-bold py-2 px-3">View Detail</button>
            </div>
            
        </div>
    );
};

export default ContestItem;