import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../../actions/post';

const CommentForm = ({ createComment, postId }) => {
  const [text, setText] = useState('');
  return (
    <div className='post-form'>
      <div className='bg-primary'>
        <h3 style={{ paddingLeft: '.8rem' }}>Comment on this...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          createComment(postId, { text });
          setText('');
        }}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Chime in here...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default connect(null, { createComment })(CommentForm);
