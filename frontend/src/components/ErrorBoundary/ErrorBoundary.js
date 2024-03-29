import React from "react";
import error from "./error-page.gif" 
import "./ErrorBoundary.css"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    setTimeout(()=>{
        window.location.replace("/")
    },10000)
    this.setState({ error: error, errorInfo: info });
  }
  render() {
    if (this.state.hasError) {
      return (
      <div className="error-main-wrapper">
        <div>
            <p className="content-center"><img src={error} alt="" /></p>
            <p className="error-txt">Something went wrong</p>
            <p className="text-center f-gray">Redirecting you to homepage in 5 sec...</p>
        </div>
      </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;