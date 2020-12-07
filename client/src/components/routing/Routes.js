import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import EditProfile from '../profile-forms/EditProfile';
import AddEducation from '../profile-forms/AddEducation';
import AddExperience from '../profile-forms/AddExperience';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/profile/:id' component={Profile} />
      <Route exact path='/profiles' component={Profiles} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/create-profile' component={CreateProfile} />
      <PrivateRoute exact path='/edit-profile' component={EditProfile} />
      <PrivateRoute exact path='/add-education' component={AddEducation} />
      <PrivateRoute exact path='/add-experience' component={AddExperience} />
      <PrivateRoute exact path='/posts' component={Posts} />
      <PrivateRoute exact path='/post/:id' component={Post} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
