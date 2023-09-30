import Router from "next/router";
import useRequest from "../../hooks/use-request";

const TicketShow = ({ ticket: { data } }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: data.id,
    },
    onSuccess: (order) => {
      console.log(data);
      Router.push('/orders/[orderId]',  `/orders/${order.data.id}`);
    },
  });

  const purchase = async () => {
    await doRequest();
  };

  return (
    <>
      <h1>{data.title}</h1>
      <h4>Price: {data.price}</h4>
      {errors}
      <button onClick={purchase} className="btn btn-primary">
        Purchase
      </button>
    </>
  );
};

TicketShow.getInitialProps = async (context, client, currentUser) => {
  const id = context.query.ticketId;
  const { data } = await client.get(`/api/tickets/${id}`);
  return {
    ticket: data,
  };
};

export default TicketShow;
