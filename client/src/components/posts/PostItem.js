import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat().format(new Date(date));
  };

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted on {formatDate(date)}</p>
        {showActions && (
          <Fragment>
            <button
              type='button'
              className='btn btn-light'
              onClick={(e) => addLike(_id)}>
              <i className='fas fa-thumbs-up' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type='button'
              className='btn btn-light'
              onClick={(e) => removeLike(_id)}>
              <i className='fas fa-thumbs-down' />
            </button>
            <Link to={`/post/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>
                  <span>{comments.length}</span>
                </span>
              )}
            </Link>
            {!auth.loading && auth.user._id === user && (
              <button
                type='button'
                onClick={(e) => deletePost(_id)}
                className='btn btn-danger'
                style={{ fontWeight: 500, lineHeight: '1.6' }}>
                <i className='fas fa-times' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
