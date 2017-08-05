import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { Utilities } from '../../Helpers';

/**
 * UsersTable component
 */
export default (user, index) => (
  <TableRow key={index} displayBorder>
    <TableRowColumn>{index + 1}</TableRowColumn>
    <TableRowColumn className="table-username-row">{user.username}</TableRowColumn>
    <TableRowColumn>{user.email}</TableRowColumn>
    <TableRowColumn>{Utilities.getRoleName(user.roleId)}</TableRowColumn>
    <TableRowColumn>
      <Link to={{
        pathname: 'profile',
        state: { id: user.id }
      }}
      >
        <RaisedButton label="View profile" />
      </Link>
    </TableRowColumn>
  </TableRow>
);

