import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Helpers from '../../utils/Helpers';

export default (user, index) => (
  <TableRow key={index} displayBorder>
    <TableRowColumn>{index + 1}</TableRowColumn>
    <TableRowColumn><Link to={`/profile/${user.id}`}>{user.username}</Link></TableRowColumn>
    <TableRowColumn>{user.email}</TableRowColumn>
    <TableRowColumn>{Helpers.getRoleName(user.roleID)}</TableRowColumn>
  </TableRow>
);

