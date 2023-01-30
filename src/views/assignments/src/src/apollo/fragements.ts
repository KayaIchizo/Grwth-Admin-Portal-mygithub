import { gql } from '@apollo/client';

export const QATasksSummary = {
  core_fields: gql`
    fragment CoreQATaskSummaryFields on QATasksSummary {
      totalQATasks
      pendingQATasks
      failedQATasks
      approvedQATasks
      unassignedTasks
      publishedTasks
    }
  `,
};

export const BATCH = {
  core_fields: gql`
    fragment CoreBatchFields on Batch {
      _id
      name
      collection
      qaTasksSummary {
        ...CoreQATaskSummaryFields
      }
      created
      createdBy
      modified
      modifiedBy
    }
    ${QATasksSummary.core_fields}
  `,
};

export const COLLECTION = {
  core_fields: gql`
    fragment CoreCollectionFields on RenderCollection {
      _id
      name
      renderJobTypes
      created
      createdBy
      modified
      modifiedBy
    }
  `,
  batches_fields: gql`
    fragment CollectionFieldsWithBatches on RenderCollection {
      _id
      name
      batches {
        ...CoreBatchFields
      }
    }
    ${BATCH.core_fields}
  `,
};

export const TRAIT = {
  core_fields: gql`
    fragment CoreTraitFields on Trait {
      _id
      name
      renderValue
      publicValue
      possibleIssues
      reportedIssues
    }
  `,
};

export const QA_TASK = {
  list_fileds: gql`
    fragment ListQATaskFields on QATask {
      _id
      batch
      collection
      state
      tokenId
      batchId
      renderId
      assignedTo
      traits {
        ...CoreTraitFields
      }
      baselineImages
      possibleIssues
      reportedIssues
      comments
    }
    ${TRAIT.core_fields}
  `,
  detail_fields: gql`
    fragment DetailQATaskFields on QATask {
      _id
      batch
      collection
      state
      tokenId
      batchId
      renderId
      assignedTo
      traits {
        ...CoreTraitFields
      }
      renderedAssets {
        renderedAssetType
        url
      }
      baselineImages
      possibleIssues
      reportedIssues
      comments
    }
    ${TRAIT.core_fields}
  `,
  frame_fields: gql`
    fragment CoreQAFrameFields on RenderedAsset {
      renderedAssetType
      url
    }
  `,
};

export const RENDER_JOB = {
  core_fields: gql`
    fragment CoreRenderJobFields on RenderJob {
      _id
      state
      renderJobType
      collection
      batch
      metadataId
      metadata
      jobStarted
      jobCompleted
      workers
      created
      createdBy
      modified
      modifiedBy
    }
  `,
};

export const RENDER_TASK = {
  core_fields: gql`
    fragment CoreRenderTaskFields on RenderTask {
      _id
      renderJobId
      taskType
      state
      collection
      batch
      metadataId
      created
      modified
    }
  `,
  fields_with_job: gql`
    fragment CoreRenderTaskFields on RenderTask {
      _id
      renderJobId
      taskType
      state
      collection
      batch
      metadataId
      created
      modified
      renderJob {
        ...CoreRenderJobFields
      }
    }
    ${RENDER_JOB.core_fields}
  `,
};
