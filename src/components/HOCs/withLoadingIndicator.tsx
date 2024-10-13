// Define the HOC
const withLoadingIndicator = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithLoadingIndicator: React.FC<P> = (props) => {
    return <WrappedComponent {...props} />;
  };

  return WithLoadingIndicator;
};

export default withLoadingIndicator;
