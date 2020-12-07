import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Alert from '../Alert';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      <section className='container'>
        <Alert />
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className='large text-primary'>Main Forum</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Welcome to the community!
            </p>
            <PostForm />
            <div className='posts'>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
