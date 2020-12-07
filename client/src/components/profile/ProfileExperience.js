import React from 'react';
import PropTypes from 'prop-types';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat().format(new Date(date));
  };
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {formatDate(from)} - {to !== 'current' ? formatDate(to) : 'current'}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
