import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { format } from "date-fns";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {contestName, contestDescription, tags, prizeMoney, contestPrice, taskSubmissionInstructions, _id} = useLoaderData();
    
 const { register, handleSubmit } = useForm();
 const [dueDate, setDueDate] = useState(new Date());
    

 const dateString = dueDate
 const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const updateList = {
                contestName: data.contestName,
                prizeMoney: data.prizeMoney,
                contestPrice: parseFloat(data.contestPrice),
                taskSubmissionInstructions: data.taskSubmissionInstructions,
                image: res.data.data.display_url,
                tags: data.tags,
                contestDescription: data.contestDescription,
                contestDeadline: formattedDate
              
            }
            // post hobe na. update hobe patch diye
            const update = await axiosSecure.patch(`/contests/${_id}`, updateList);
            console.log(update.data)
            if(update.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.contestName} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };
    
    
    return (
        <div>
            <SectionTitle heading="Update your Contest" subHeading="Update info"></SectionTitle>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>

<div className="flex gap-4">

    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Content Name*</span>
        </label>
        <input
            type="text"
            placeholder="Content Name"
            defaultValue={contestName}
            {...register('contestName', { required: true })}
            required
            className="input input-bordered w-full" />
    </div>
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Prize Money Amount*</span>
        </label>
        <input
            type="number"
            defaultValue={prizeMoney}
            placeholder="Prize Money"
            {...register('prizeMoney', { required: true })}
            required
            className="input input-bordered w-full" />
    </div>
    {/* price */}
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Price*</span>
        </label>
        <input
            type="number"
            defaultValue={contestPrice}
            placeholder="Price"
            {...register('contestPrice', { required: true })}
            className="input input-bordered w-full" />
    </div>
</div>
<div className="flex gap-4">

    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">taskSubmissionInstructions*</span>
        </label>
        <input
            type="text"
            placeholder="taskSubmissionInstructions"
            defaultValue={taskSubmissionInstructions}
            {...register('taskSubmissionInstructions', { required: true })}
            required
            className="input input-bordered w-full" />
    </div>
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">contestDescription*</span>
        </label>
        <input
            type="text"
            placeholder="contestDescription"
            defaultValue={contestDescription}
            {...register('contestDescription', { required: true })}
            required
            className="input input-bordered w-full" />
    </div>
    <div className="form-control w-full my-6">
        <label className="label">
            <span className="label-text">Tags*</span>
        </label>
        <select defaultValue={tags} {...register('tags', { required: true })}
            className="select select-bordered w-full">
            <option disabled value="default">Select a category</option>
            <option value="Image Design Contests">Image Design
                Contests</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Marketing Strategy">Marketing Strategy</option>
            <option value="Digital advertisement Contests">Digital
                advertisement Contests</option>
            <option value="Gaming Review">Gaming Review</option>
            <option value="Book Review">Book Review</option>
            <option value="Business Idea Concerts">Business Idea Concerts</option>
            <option value="Movie Review">Movie Review</option>
        </select>

    </div>
  
</div>

<div className="">


    <div className="form-control w-full">
        <label className="block mt-4 mb-2 dark:text-white" htmlFor="contestDeadline">
            Due Date
        </label>
        <ReactDatePicker
            className="block p-2 border rounded-md focus:outline-[#92b0e7]"
            selected={dueDate}
            onChange={date => setDueDate(date)}
            placeholderText="Select a date"
            id="contestDeadline"
            name="contestDeadline"
            required

        />
       
    </div>
    
</div>
<div className="form-control w-full my-3">
        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
    </div>

  <button className="btn border-2 border-purple-600">
    Update Content
</button>
</form>
           
            </div>
        </div>
    );
};

export default UpdateItem;