/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTalk = /* GraphQL */ `
  mutation CreateTalk(
    $input: CreateTalkInput!
    $condition: ModelTalkConditionInput
  ) {
    createTalk(input: $input, condition: $condition) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
    }
  }
`;
export const updateTalk = /* GraphQL */ `
  mutation UpdateTalk(
    $input: UpdateTalkInput!
    $condition: ModelTalkConditionInput
  ) {
    updateTalk(input: $input, condition: $condition) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
    }
  }
`;
export const deleteTalk = /* GraphQL */ `
  mutation DeleteTalk(
    $input: DeleteTalkInput!
    $condition: ModelTalkConditionInput
  ) {
    deleteTalk(input: $input, condition: $condition) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
    }
  }
`;
