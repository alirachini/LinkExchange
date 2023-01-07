import "./Spinner.css";
import Logo from "../../Assets/logo.png"

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"><img src={Logo}/></div>
    </div>
  );
};

export default LoadingSpinner;