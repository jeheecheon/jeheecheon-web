import { gql } from "graphql-request";
import { ACCOUNT_FRAGMENT } from "~/graphql/documents/account.fragment";
import { COMMENT_FRAGMENT } from "~/graphql/documents/comment.fragment";
import { ROLE_FRAGMENT } from "~/graphql/documents/role.fragment";

export const LIST_COMMENTS = gql`
  query ListComments($filter: ListCommentsFilter!) {
    comments(filter: $filter) {
      ...CommentFragment
      account {
        ...AccountFragment
        roles {
          ...RoleFragment
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${ACCOUNT_FRAGMENT}
  ${ROLE_FRAGMENT}
`;
