import React from 'react';

export default (Consumer, Component) => {
  return (() =>
    <Consumer>
      {props => (<Component {...props}/>)}
    </Consumer>
  )
}