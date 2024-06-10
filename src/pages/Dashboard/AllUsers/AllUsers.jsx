import { useQuery } from "@tanstack/react-query";
import { FaUserGear } from "react-icons/fa6";
import { FaUserEdit  } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
           
            return res.data;
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleMakeCreator = user =>{
        axiosSecure.patch(`/users/creator/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is a Creator Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleMakeUser = user =>{
        axiosSecure.patch(`/users/user/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is an user Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleDeleteUser = user => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {

              axiosSecure.delete(`/users/${user._id}`)
                  .then(res => {
                      if (res.data.deletedCount > 0) {
                          refetch();
                          Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success"
                          });
                      }
                  })
          }
      });
  }

 

    return (
        <div>
            <div className="flex justify-evenly my-4">
             
                <h2 className="text-xl text-center">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                         <th>Email</th>
                            <th>Admin Button</th>
                            <th>Creator Button</th>
                            <th>User Button</th>
                            <th>Delete Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                
                                <td>{user.email}</td>
                                <td>
                                    { user.role === 'admin' ? 'admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-xl bg-orange-500">
                                        <GrUserAdmin className="text-white 
                                        text-2xl"/>
                                    </button>}</td>
                                
<td>
                                { user.role === 'creator' ? 'creator' : <button
                                        onClick={() => handleMakeCreator(user)}
                                        className="btn 6 btn-xl bg-orange-500">
                                        <FaUserEdit className="text-white 
                                        text-2xl"/>
                                    </button>}
                               

                                
                                     </td>
                                  <td>{ user.role === 'user' ? 'user' : <button
                                        onClick={() => handleMakeUser(user)}
                                        className="btn btn-xl bg-orange-500">
                                        <FaUserGear className="text-white 
                                        text-2xl"/>
                                    </button>}</td>
                               
                                <td>
                                <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg bg-red-500">
                                        <MdOutlineDelete className="text-white text-2xl"></MdOutlineDelete>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;