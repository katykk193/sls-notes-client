import { Component } from 'react';
import { Empty } from 'antd';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Empty
          description={
            <span className="text-white text-xl">Something went wrong</span>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
