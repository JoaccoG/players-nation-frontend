import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {
      auth: {
        status: 'idle',
        loginMsg: '',
        loginStatus: 'idle',
        registerMsg: '',
        registerStatus: 'idle',
      },
      posts: {
        status: 'idle',
        posts: [],
        postsCount: 0,
        postCreationStatus: 'idle',
        postCreationMsg: '',
        postGetStatus: 'idle',
        postGetMsg: '',
        filePreview: '',
      },
      users: {
        status: 'idle',
        user: {
          _id: '',
          email: '',
          password: '',
          username: '',
          name: '',
          surname: '',
          avatar: '',
          biography: '',
          favGames: [],
          followersCount: 0,
          followingCount: 0,
          isFollower: false,
        },
        getOneUserStatus: 'idle',
        userPosts: [],
        userPostsCount: 0,
        getUserPostsStatus: 'idle',
        followUserStatus: 'idle',
      },
      games: {
        status: 'idle',
        games: [],
        gamesCount: 0,
        getGamesStatus: 'idle',
        getGamesMsg: '',
      },
    },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
