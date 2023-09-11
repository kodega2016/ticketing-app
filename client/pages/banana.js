const Banana = ({ color }) => {
  console.log("I was executed on the client", color);
  return <h1>Banana page</h1>;
};

Banana.getInitialProps = () => {
  console.log("I was executed on the server");
  return {
    color: "yellow",
  };
};

export default Banana;
