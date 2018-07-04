import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Notification from 'grommet/components/Notification';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Meter from 'grommet/components/Meter';
import Spinning from 'grommet/components/icons/Spinning';
// import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';
import {
  loadTimekeeper, unloadTimekeeper
} from '../actions/timekeeper';

import { pageLoaded } from './utils';

class Timekeeper extends Component {
  componentDidMount() {
    pageLoaded('Timekeeper');
    this.props.dispatch(loadTimekeeper());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadTimekeeper());
  }

  getCurrentWeek() {
    return this.props.days.filter((day) => {
      return moment(day.date).isBetween(moment().weekday(0), moment().weekday(7));
    });
  }

  render() {
    console.log('in render', this.props);
    const { error, days } = this.props;
    // const { intl } = this.context;
    console.log('current week', this.getCurrentWeek());

    let errorNode;
    let tableNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (days.length === 0) {
      tableNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      // const tasksNode = (days || []).map(day => (
      //   <Tile
      //     key={`task_${day.id}`}
      //     justify='between'
      //   >
      //     <Label><Anchor path={`/tasks/${day.id}`} label={moment(day.date).format('ddd')} /></Label>
      //     <Box
      //       direction='row'
      //       responsive={false}
      //       pad={{ between: 'small' }}
      //     >
      //       <Meter value={(day.time / 8) * 100} type='arc' />
      //     </Box>
      //   </Tile>
      // ));

      // listNode = (
      //   <Tiles>
      //     {tasksNode}
      //   </Tiles>
      // );
      tableNode = (
        <Table>
          <thead>
            <tr>{ moment.weekdays().map(day => <th key={`weekday_${day}`}>{day}</th>)}</tr>
          </thead>
          <tbody>
            <TableRow>
              {this.getCurrentWeek().map(day => <td key={`day_${day.id}`}>{day.time} hours</td>)}
            </TableRow>
          </tbody>
        </Table>
      );
    }

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl />
        </Header>
        {errorNode}
        <Box pad='medium'>
          <Heading tag='h3' strong={true}>
            Current Week
          </Heading>
        </Box>
        {tableNode}
      </Article>
    );
  }
}

Timekeeper.defaultProps = {
  error: undefined,
  days: [],
  currentWeek: []
};

Timekeeper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  days: PropTypes.arrayOf(PropTypes.object),
  currentWeek: PropTypes.arrayOf(PropTypes.object)
};

Timekeeper.contextTypes = {
  intl: PropTypes.object
};

const select = (state) => { console.log('state', state); return ({ ...state.timekeeper }); };

export default connect(select)(Timekeeper);
