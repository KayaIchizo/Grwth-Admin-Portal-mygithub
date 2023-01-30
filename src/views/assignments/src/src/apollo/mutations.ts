import { gql } from '@apollo/client';

export const BATCH_MUTATION = {
  deleteBatch: gql`
    mutation DeleteBatch($batchId: ID!) {
      deleteBatch(batchId: $batchId) {
        tasksAffected
      }
    }
  `,
};

export const QA_TASK_MUTATION = {
  approve: gql`
    mutation ApproveQATask($qaTaskId: ID!, $comments: String) {
      approveQATask(qaTaskId: $qaTaskId, comments: $comments) {
        _id
        state
        comments
      }
    }
  `,
  builkApprove: gql`
    mutation ApproveMultipleQATasks($qaTaskIds: [ID]!, $comments: String) {
      approveMultipleQATasks(qaTaskIds: $qaTaskIds, comments: $comments) {
        _id
        state
        comments
      }
    }
  `,
  reset: gql`
    mutation ResetQATask($qaTaskId: ID!, $comments: String) {
      resetQATask(qaTaskId: $qaTaskId, comments: $comments) {
        _id
        comments
        state
        reportedIssues
        traits {
          _id
          name
          publicValue
          renderValue
          possibleIssues
          reportedIssues
        }
      }
    }
  `,
  builkReset: gql`
    mutation Mutation($qaTaskIds: [ID]!, $comments: String) {
      resetMultipleQATasks(qaTaskIds: $qaTaskIds, comments: $comments) {
        _id
        batch
        state
        comments
      }
    }
  `,
  fail: gql`
    mutation FailQATask(
      $qaTaskId: ID!
      $reportedIssues: [String!]
      $traitIssues: [TraitIssue!]
      $comments: String
    ) {
      failQATask(
        qaTaskId: $qaTaskId
        reportedIssues: $reportedIssues
        traitIssues: $traitIssues
        comments: $comments
      ) {
        _id
        state
        comments
        possibleIssues
        reportedIssues
        traits {
          _id
          name
          publicValue
          renderValue
          possibleIssues
          reportedIssues
        }
      }
    }
  `,
  builkFail: gql`
    mutation FailMultipleQATasks($qaTaskIds: [ID]!, $reportedIssues: [String!], $comments: String) {
      failMultipleQATasks(
        qaTaskIds: $qaTaskIds
        reportedIssues: $reportedIssues
        comments: $comments
      ) {
        _id
        comments
        state
      }
    }
  `,
  tasksDistribute: gql`
    mutation DistributeUnassignedQATasks($batchId: ID!) {
      distributeUnassignedQATasks(batchId: $batchId) {
        tasksAffected
        usersAffected
        tasksNotAssigned
      }
    }
  `,
  builkAssign: gql`
    mutation AssignUserToMultipleQATasks($qaTaskIds: [ID!], $userEmail: String!) {
      assignUserToMultipleQATasks(qaTaskIds: $qaTaskIds, userEmail: $userEmail) {
        _id
        assignedTo
      }
    }
  `,
  assign: gql`
    mutation AssignUserToQATask($qaTaskId: ID!, $userEmail: String!) {
      assignUserToQATask(qaTaskId: $qaTaskId, userEmail: $userEmail) {
        _id
        assignedTo
      }
    }
  `,
  builkPublish: gql`
    mutation PublishQATasks($qaTaskIds: [ID!]) {
      publishQATasks(qaTaskIds: $qaTaskIds) {
        state
      }
    }
  `,
};
