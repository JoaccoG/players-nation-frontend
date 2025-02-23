import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { PostFormContainer, PostFormFeedback } from './post-form-styled';
import {
  createNewPost,
  resetPostCreationStatus,
  selectPostsSlice,
  uploadFile,
} from '../../posts-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FC } from 'react';

interface PostFormProps {
  games: string[];
}

const PostForm: FC<PostFormProps> = ({ games }) => {
  const dispatch = useAppDispatch();
  const { postCreationStatus, postCreationMsg, filePreview } =
    useAppSelector(selectPostsSlice);

  const postFeedback = () => {
    switch (postCreationStatus) {
      case 'idle':
        return (
          <PostFormFeedback postStatus={postCreationStatus}>
            Post something new...
          </PostFormFeedback>
        );
      case 'success':
        return (
          <PostFormFeedback postStatus={postCreationStatus}>
            Your post has been created!
          </PostFormFeedback>
        );
      case 'error':
        return (
          <PostFormFeedback postStatus={postCreationStatus}>
            Error during post creation, please try again later (
            {postCreationMsg}).
          </PostFormFeedback>
        );
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(createNewPost(e.currentTarget));
    dispatch(uploadFile(''));
    e.currentTarget.reset();
    setTimeout(() => {
      dispatch(resetPostCreationStatus());
    }, 5000);
  };

  return (
    <>
      <PostFormContainer
        data-testid="posts-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(e);
        }}
      >
        <>
          {postFeedback()}
          <div className="post-form__wrapper-1">
            <label htmlFor="game">
              <select
                id="game"
                name="game"
                required
                defaultValue=""
                data-testid="game"
              >
                <option value="" disabled>
                  Choose a game
                </option>
                {games.map((game) => (
                  <option key={game} value={game} data-testid={`game-${game}`}>
                    {game}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="rating">
              <select
                id="rating"
                name="rating"
                required
                defaultValue=""
                data-testid="rating"
              >
                <option value="" disabled>
                  Rate your game
                </option>
                {Array.from({ length: 5 }, (_asd, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                    data-testid={`rating-${i + 1}`}
                  >
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label htmlFor="review">
            <textarea
              required
              id="review"
              name="review"
              placeholder="Tell others your experience..."
              maxLength={240}
              data-testid="review"
            />
          </label>
          <div className="post-form__wrapper-2">
            <label htmlFor="photo">
              <FontAwesomeIcon
                className="wrapper-2__file-upload-icon"
                icon={solid('image')}
              />
              <span>{filePreview}</span>
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={(e) => {
                  dispatch(uploadFile(e.target.files?.[0].name));
                }}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                data-testid="photo"
              />
            </label>
            <button type="submit">Post</button>
          </div>
        </>
      </PostFormContainer>
    </>
  );
};

export default PostForm;
