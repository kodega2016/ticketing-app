import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order: { data } }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "get",
    body: {},
    onSuccess: (order) => {
      // Router.push('/orders/[orderId]',  `/orders/${order.data.id}`);
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

  return (
    <div>
      <h1>Order Show</h1>
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
