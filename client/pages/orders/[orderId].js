import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";

const OrderShow = ({ order: { data }, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: data.id,
    },
    onSuccess: (payment) => {
      console.log("payment successful", payment);
      Router.push("/");
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(data.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [data]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  const onToken = async (token) => {
    await doRequest({ token: token.id });
  };

  return (
    <div>
      <h1>Order Show</h1>
      <StripeCheckout
        token={onToken}
        amount={data.ticket.price * 100}
        email={currentUser.email}
        stripeKey="pk_test_51NvUDuG1jivoiAUMZ27YY6DebshIaXANkYbM8OlMhOC0YtFZdpZ512pcrDqMOAKYZZfaoUmISRLy8lGOEYLiEWGi00ctGq0wnD"
      />
      <p>Time left to pay:{timeLeft} seconds</p>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return {
    order: data,
  };
};

export default OrderShow;
