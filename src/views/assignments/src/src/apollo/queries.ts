import { gql } from '@apollo/client';
import { COLLECTION, TRAIT, RENDER_TASK, QA_TASK, BATCH } from './fragements';

export const COLLECTION_QUERY = {
  get_collections: gql`
    ${COLLECTION.core_fields}
    query RenderCollections($renderCollectionFilter: RenderCollectionFilter!) {
      renderCollections(renderCollectionFilter: $renderCollectionFilter) {
        ...CoreCollectionFields
      }
    }
  `,
};

export const BATCH_QUERY = {
  get_batches: gql`
    ${BATCH.core_fields}
    query Batches($batchFilter: BatchFilter!) {
      batches(batchFilter: $batchFilter) {
        ...CoreBatchFields
      }
    }
  `,
  get_batch: gql`
    ${BATCH.core_fields}
    query Batch($batchId: ID!) {
      batch(id: $batchId) {
        ...CoreBatchFields
      }
    }
  `,
};

export const QA_TASK_QUERY = {
  get_qa_tasks: gql`
    ${QA_TASK.list_fileds}
    query qaTasks(
      $qaTaskFilter: QATaskFilter!
      $search: String
      $orderBy: OrderBy
      $first: Int
      $offset: Int
      $after: String
      $before: String
    ) {
      qaTasks(
        qaTaskFilter: $qaTaskFilter
        search: $search
        orderBy: $orderBy
        first: $first
        offset: $offset
        after: $after
        before: $before
      ) {
        ...ListQATaskFields
      }
    }
  `,
  get_qa_task: gql`
    ${QA_TASK.detail_fields}
    query QaTasks($qaTaskId: ID!) {
      qaTask(id: $qaTaskId) {
        ...DetailQATaskFields
      }
    }
  `,
  get_qa_frames: gql`
    ${QA_TASK.frame_fields}
    query RenderedAssets($batchId: ID!, $renderId: Int!, $renderedAssetType: RenderedAssetType!) {
      renderedAssets(
        batchId: $batchId
        renderId: $renderId
        renderedAssetType: $renderedAssetType
      ) {
        ...CoreQAFrameFields
      }
    }
  `,
};

export const QA_USER_QUERY = {
  get_qa_users: gql`
    query QaUsers($collection: String!) {
      qaUsers(collection: $collection) {
        email
        name
        roles
      }
    }
  `,
};

export const TRAIT_QUERY = {
  get_traits: gql`
    ${TRAIT.core_fields}
    query fetchTraits($traitFilter: TraitFilter!) {
      traits(traitFilter: $traitFilter) {
        ...CoreTraitFields
      }
    }
  `,
};

export const RENDER_TASK_QUERY = {
  get_render_tasks: gql`
    ${RENDER_TASK.core_fields}
    query fetchRenderTasksQuery($renderTaskFilter: RenderTaskFilter!) {
      renderTasks(renderTaskFilter: $renderTaskFilter) {
        ...CoreRenderTaskFields
      }
    }
  `,
  get_render_detail_tasks: gql`
    ${RENDER_TASK.fields_with_job}
    query fetchRenderTasksQuery($renderTaskFilter: RenderTaskFilter!) {
      renderTasks(renderTaskFilter: $renderTaskFilter) {
        ...CoreRenderTaskFields
      }
    }
  `,
};
