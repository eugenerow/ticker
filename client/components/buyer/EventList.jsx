import React from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import EventListItem from './EventListItem.jsx';
import { bindActionCreators } from 'redux';
import Maps from './Maps.jsx';
import { getLocation, selectTab } from '../../actions/index';

class EventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
  // console.log("activeTab.length", this.props.activeTab.length);
    if (this.props.activeTab !== 'a') {
      console.log("this.props.activeTab", this.props.activeTab);
      this.setState({value: this.props.activeTab});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeTab !== prevProps.activeTab) {
      console.log("inside of componentDidUpdate in eventlist:", this.props.activeTab);
      this.setState({value: this.props.activeTab});

    }
  }

  renderEventList() {
    if (this.props.events) {
      return (
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          style={{marginTop: '20px'}}
        >
          <Tab label="List View" value="a" >
            <div className="list">
            {this.props.events.map((event, idx) => {return <EventListItem key={idx} event={event} />})}
            </div>
          </Tab>
          <Tab label="Map View" value="b">
            <div className="map">
              <Maps />
            </div>
          </Tab>
        </Tabs>
      );
    } else {
      return (
        <div>No events match this search.</div>
      );
    }
  }

  handleChange(value) {
    console.log("inside of handleChange in EventList:", value);
    this.setState({
      value: value,
    });
    this.props.selectTab(value);
  }

  render() {
    return (
      <div className="list">
        { this.renderEventList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    userLocation: state.userLocation,
    activeTab: state.activeTab,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation, selectTab }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
