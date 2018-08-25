import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from 'grommet/components/Form';
import Select from 'grommet/components/Select';
import DateTime from 'grommet/components/DateTime';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import { closeAddTime } from '../actions/timekeeper';

class AddTime extends Component {
  close() {
    this.props.dispatch(closeAddTime(this.state));
  }

  render() {
    return (
      <div>
        <Heading margin='small' tag='h5'>
          Add Time
        </Heading>
        <Form pad='small'>
          <DateTime id='daySelector' format='M/D/YYYY' onChange={date => this.setState({ ...this.setState, date })} />
          <Select placeHolder='None'
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
            value='8'
            onChange={hours => this.setState({ ...this.setState, hours: hours.value })} />
          <Button label='Submit'
            onClick={() => this.close()}
            href='#' />
        </Form>
      </div>
    );
  }
}


AddTime.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const select = state => ({ ...state.timekeeper });

export default connect(select)(AddTime);
