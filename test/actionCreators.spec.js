import test from 'ava';
import 'babel-core/register';
import {
  pendingActionCreator,
  doneActionCreator,
  failureActionCreator,
  invalidateActionCreator,
} from '../src/actionCreators';

import {
  ASYNC_UTILS_MARKER,
  ASYNC_UTILS_STATE,
  ASYNC_UTILS_STATE_FOR,
  ASYNC_UTILS_STATE_GROUP,
  PENDING,
  DONE,
  FAILURE,
  INVALIDATED,
} from '../src/constants';

const SOMETHING_TO_DO_ASYNCHRONOUSLY = 'SOMETHING_TO_DO_ASYNCHRONOUSLY';

test('should return a pending action', t => {
  t.same(pendingActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY), {
    type: PENDING,
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: PENDING,
    [ASYNC_UTILS_STATE_GROUP]: undefined,
  });
});

test('should return a pending action managing group', t => {
  const group = 'test';
  t.same(pendingActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY, group), {
    type: PENDING,
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: PENDING,
    [ASYNC_UTILS_STATE_GROUP]: group,
  });
});

test('should return an invalidated action', t => {
  t.same(invalidateActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY), {
    type: INVALIDATED,
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: INVALIDATED,
  });
});

test('should return a failure action', t => {
  t.same(failureActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY), {
    type: FAILURE,
    error: null,
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: FAILURE,
  });
});

test('should return a failure action with error', t => {
  const err = new Error('an error');
  t.same(failureActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY, err), {
    type: FAILURE,
    error: err,
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: FAILURE,
  });
});

test('should return a done action', t => {
  t.same(doneActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY), {
    type: DONE,
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: DONE,
  });
});

test('should return a decorated done action', t => {
  t.same(doneActionCreator(SOMETHING_TO_DO_ASYNCHRONOUSLY, {
    type: 'SET_DATA',
    payload: {
      data: [],
    },
  }), {
    type: 'SET_DATA',
    payload: {
      data: [],
    },
    [ASYNC_UTILS_MARKER]: true,
    [ASYNC_UTILS_STATE_FOR]: SOMETHING_TO_DO_ASYNCHRONOUSLY,
    [ASYNC_UTILS_STATE]: DONE,
  });
});
