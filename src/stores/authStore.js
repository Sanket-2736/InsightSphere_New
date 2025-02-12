import { create } from "zustand";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningIn: false,
  userRole: null,

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data);

      if (res.data.success) {
        console.log(res.data.user);
        set({
          authUser: res.data.user, // ✅ Fixed `req.data.user` → `res.data.user`
          userRole: res.data.role, // ✅ Fixed `req.data.role` → `res.data.role`
        });
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error in login:", error);
      if(error.response){
        console.log(error.response.data);
        toast.error(error.response.data.message || "Login failed! Try again..")
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  register: async (data) => {
    set({ isSigningIn: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      if (res.data.success) {
        console.log(res.data.user);
        set({
          authUser: res.data.user,
          userRole: res.data.role,
        });
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.error("Error in signup:", error);
      
      // Ensure res is not accessed outside try block
      if (error.response) {
        console.error("Registration response: ", error.response.data);
        toast.error(error.response.data.message || "Signup failed. Please try again.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout : async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if(res.data.success){
        toast.success(res.data.message || "Logout successfull");
      } else {
        toast.error(res.data.message || "Try logout again!");
      }
    } catch (error) {
      console.log("Error in logout: ", error);
      toast.error(error.response.data.message || "Internal server error");
    }
  },

  isViewingNews : false,
  viewNews : async (data) => {
    const {authUser} = get();

    try {
        console.log("Data submitted for viewing news: ", data);
        const res = await axiosInstance.post(`/auth/view-news/${authUser._id}`, data);
        if(res.data.success){
            toast.success("News added to your history!");
            window.open(data.newsUrl, '_blank');
        }
        set({isViewingNews : true});
    } catch (error) {
        console.log("Error in viewing news: ", error);

        if(error.response.data){
            console.log(error.response.data);
            toast.error(error.response.data.message || "Login to view the news!");
        }
    }
    set({isViewingNews : false});
  },

  isSavingPost : false,
  savePost : async (data) => {
    const {authUser} = get();
    try {
      set({isSavingPost : true})
      console.log("Data submitted for saving news: ", data);
      const res = await axiosInstance.post(`/auth/save-post/${authUser._id}`, data);
      if(res.data.success){
        toast.success(res.data.message || "Post saved successfully, visit profile to view.");
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log("Error in saving post: ", error);
      if(error.response){
        toast.error(error.response.data.message || "Failed to save the post, try again!");
      }
    } finally{
      set({isSavingPost: false});
    }
  },

  isFetchingNews : false,
  categorisedArticles : [],
  fetchBasedOnCategory : async () => {
    try {
      set({isFetchingNews : true});
      console.log("fetching the news for categories")
      const res = await axiosInstance.get('/auth/world-news');
      if(res.data.success){
        toast.success(res.data.message || "Articles based on your preferences fetched successfully!")
        set({categorisedArticles : res.data.articles});
      }
    } catch (error) {
      console.log("Failed to fetch news: ", error)
      if(error.response){
        toast.error(error.response.data.message || "Failed to fetch news, try again!");
      }
    } finally{
      set({isFetchingNews : false});
    }
  }
}));
