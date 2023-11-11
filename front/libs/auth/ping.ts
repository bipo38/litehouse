// export const ping = async (): Promise<boolean> => {
//     const loggedIn = useCookie("jwt");
  
//     if (!loggedIn.value) {
//       return false;
//     }
  
//     const user = useState("authUser");
  
//     const result = await useApi().get("/api/user");
  
//     loggedIn.value = result.successful ? "true" : null;
//     user.value = result.successful ? result.data : {};
  
//     return result.successful;
//   };