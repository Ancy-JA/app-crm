import gql from "graphql-tag";

export const REFRESH_TOKEN_QUERY = `
  query getAccessTokenFromRefresh($access: String!, $refresh: String!) {
    getAccessToken(accessToken: $access, refreshToken: $refresh) {
      accessToken
      refreshToken
    }
  }
`;

// providers/data/queries.ts

export const GET_BOX_HISTORY_ADMIN = `
   query getBoxHistoryAdmin(
    $searchString: String!
    $page: Float!
    $pageSize: Float!
  ) {
    getBoxHistoryAdmin(
      searchString: $searchString
      page: $page
      pageSize: $pageSize
    ) {
      total
      boxes {
        _id
        user {
          _id
          email
          name
          phone
          house
          city
          country
          zipcode
        }
        created_at
        delivery_date
        status
        box_type
        box_wines {
          _id
          name
          box_count
        }
      }
    }
  }

`;
export const USER_LOGIN_QUERY = `
  query userLogin($payload: UserLoginDto!) {
    userLogin(payload: $payload) {
      accessToken
      refreshToken
    }
  }
`;
export const GET_BOX_WINE_PRINT_CARD = gql`
    query getBoxWinePrintCard($box: String!) {
        getBoxWinePrintCard(box: $box)
    }
`;
