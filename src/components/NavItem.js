import React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import classnames from 'classnames';

class PUNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  activate = () => {
    this.setState({open: true});
  }

  render() {
    var navClasses = classnames({
      open: this.state.open,
      puNavItem: true
    });
    return (
      <LinkContainer to={this.props.routeData.route}>
        <NavItem className={navClasses} href="#" onClick={this.activate}>
          {this.props.routeData.label}
        </NavItem>
      </LinkContainer>
    )
  }
}

export default PUNavItem;
