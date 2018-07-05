import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Notification from 'grommet/components/Notification';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Spinning from 'grommet/components/icons/Spinning';
import Add from 'grommet/components/icons/base/Add';
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
      return moment(day.date).isBetween(moment().weekday(-1), moment().weekday(6));
    });
  }

  render() {
    const { error, days } = this.props;
    // const { intl } = this.context;

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
            <tr>
              { moment.weekdays().map(day => (
                <th key={`weekday_${day}`} className={day === moment().format('dddd') && 'day-highlight'}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRow>
              {this.getCurrentWeek().map(day => (
                <td key={`day_${day.id}`} className={moment(day.date).isSame(moment(), 'day') && 'day-highlight'}>
                  {day.time} hours
                </td>
              ))}
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
            <Label style={{ 'margin-left': '10px' }}>({moment().weekday(0).format('dddd, MMMM Do YYYY')} - {moment().weekday(7).format('dddd, MMMM Do YYYY')})</Label>
            <Button primary={true} icon={<Add />} style={{ float: 'right' }} href='#' />
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
};

Timekeeper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  days: PropTypes.arrayOf(PropTypes.object),
};

Timekeeper.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.timekeeper });

export default connect(select)(Timekeeper);
