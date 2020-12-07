import React from 'react';
import PropTypes from 'prop-types';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat().format(new Date(date));
  };
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        {formatDate(from)} - {to !== 'current' ? formatDate(to) : 'current'}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
