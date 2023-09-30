const New = () => {
  return (
    <>
      <h1>Create a Ticket</h1>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" placeholder="Enter ticket name..." />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input className="form-control" placeholder="Enter ticket price..." />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </>
  );
};

export default New;
