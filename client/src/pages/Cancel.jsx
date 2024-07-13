import { Link } from "react-router-dom";

 
const Cancel = () => {
    return (
        <div >
          <h1>Payment Cancelled or Failed!</h1>
          <p>Your payment could not be processed.</p>
          <Link to="/">Go back to home</Link>
        </div>
      );
    };

export default Cancel