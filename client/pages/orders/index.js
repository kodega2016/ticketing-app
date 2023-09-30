import { parseISO, format } from "date-fns";

const Orders = ({ orders: { data } }) => {
  const orderList = data.map((order) => {
    return (
      <li key={order.id}>
        {order.ticket.title} -{" "}
        <span className="badge badge-success">{order.status}</span>-{" "}
        {order.ticket.price} -{" "}
        {format(parseISO(order.expiresAt), "LLLL d, yyyy")}
      </li>
    );
  });
  return (
    <>
      <h1>Orders</h1>
      {orderList}
    </>
  );
};

Orders.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/orders");
  return {
    orders: data,
  };
};

export default Orders;
