import { Link } from "react-router-dom";


const Success = () => {
    return (
        <div >
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment.</p>
          <Link to="/">Go back to home</Link>
        </div>
      );
    };
export default Success