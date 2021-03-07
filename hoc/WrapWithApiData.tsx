import React, { Component } from "react";

interface IProps {
  apiRoute: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function WrapWithApiData<TProps>(OrigComponent: any) {
  return class WrappedComponent extends Component<IProps & TProps, {data: any}> {
    constructor(props: any) {
      super(props);
      this.state = {
        data: {

        }
      };
    }
    componentDidMount() {
      fetch(`/api/${this.props.apiRoute}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ data: data });
        });
    }
    render(){
      const {...rest} = this.props;
      return(
        <OrigComponent {...this.state.data} {...rest} />
      );
    }
  };
}

export default WrapWithApiData;
