import React from 'react';

class Scan extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      count: '',
      owner: ''
    }
    this.sendArp = this.sendArp.bind(this);
  }  

  sendArp() {
    
  }

  render() {
    return(
      <>

      </>
    );
  };
}

export default Scan;
