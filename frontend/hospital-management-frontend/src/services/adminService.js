import axiosInstance from "../api/axiosConfig";


export const fetchAdminData=async()=>{
   try {
    const response=await axiosInstance.get("/api/admin/details");
    return response.data;
   } catch (error) {
    throw error;
   }
}
