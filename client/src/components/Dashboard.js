import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profile';
import { accountDelete } from '../actions/auth';
import Spinner from './Spinner';
import DashboardActions from './dashboard/DashboardActions';
import Experience from './dashboard/Experience';
import Education from './dashboard/Education';
import Alert from './Alert';

const Dashboard = ({
  getCurrentProfile,
  accountDelete,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    accountDelete();
  };
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {user && user.name}
        </p>
        {profile === null ? (
          <Fragment>
            <p>Looks like you don't have a profile yet! You should add one!</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              <i className='fas fa-id-badge'></i> Create Profile
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
          </Fragment>
        )}
        <Fragment>
          <div>
            <button
              to='!#'
              type='button'
              style={{ fontWeight: 500, lineHeight: '1.6' }}
              onClick={(e) => handleDelete(e)}
              className='btn btn-danger my-1'>
              <i className='fas fa-user-minus'></i> Delete Account
            </button>
          </div>
        </Fragment>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  accountDelete: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, accountDelete })(
  Dashboard
);
