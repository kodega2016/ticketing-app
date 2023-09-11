import axios from "axios";

const Landing = ({ currentUser }) => {
  console.log(currentUser);
  console.log("I was executed on the client");
  return <h1>Landing Page</h1>;
};

Landing.getInitialProps = async () => {
  if (typeof window === "undefined") {
    console.log("I was executed on the server");
  } else {
    console.log("I was executed on the client");
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};

export default Landing;
