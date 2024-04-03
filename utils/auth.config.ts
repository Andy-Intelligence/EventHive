 export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }: any) {
      console.log(auth,request)
      // return false;
    },
  },
};


