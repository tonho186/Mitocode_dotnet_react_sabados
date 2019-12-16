import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Actividades from '../containers/Actividades/Actividades';
import Home from '../containers/Home/Home';
import Members from '../containers/Members/Members';
import Lists from '../containers/Lists/Lists';
import ActividadEdit from '../containers/Actividades/ActividadEdit/ActividadEdit';
//import ActividadDetail from './../containers/Actividades/ActividadDetail/ActividadDetail';
import MemberEdit from '../containers/Members/MemberEdit/MemberEdit';
import MemberDetail from './../containers/Members/MemberDetail/MemberDetail';
import auth from '../services/authService';
import AdminPanel from '../containers/Admin/AdminPanel';
import { roles } from './../config/roles';

const Routes = ({ isAuthenticated }) => {
  let appRoutes = (
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/' component={Home} />
      <Redirect from='/' exact to='/home' />
    </Switch>
  );

  if (isAuthenticated) {
    appRoutes = (
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/members/:id' component={MemberDetail} />
        <Route path='/members' component={Members} />
        <Route path='/member/edit' component={MemberEdit} />
{/*         <Route path='/actividades/:id' component={ActividadDetail} /> */}
        <Route path='/actividades' component={Actividades} />
        <Route path='/actividad/edit' component={ActividadEdit} />
        <Route path='/lists' component={Lists} />
        {auth.roleMatch(roles) ? (
          <Route path='/admin' component={AdminPanel} />
        ) : null}
        <Route path='/' component={Home} />
        <Redirect from='/' exact to='/home' />
      </Switch>
    );
  }

  return appRoutes;
};

export default Routes;
