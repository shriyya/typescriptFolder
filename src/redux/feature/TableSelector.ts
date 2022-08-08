import { createSelector } from "redux-orm";
import orm from "../schema";

export const makeGetTabeldataByID = (id) => {
  return createSelector([orm], (session) => {
    console.log("selecting for id: ", id, session);
    const post = session.Post.withId(id);
    if (!post) return null;
    return {
      id: post.id,
      content: post.content,
      name: post.user.name,
    };
  });
};

export const postIDsSelector = createSelector(orm, (session) => {
  console.log(orm, session);

  return session.Post.all()
    .toModelArray()
    .map((post) => post.id);
});
