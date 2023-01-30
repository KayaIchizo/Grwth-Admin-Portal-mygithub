import { RenderedAssetType, TraitIssue } from 'src/@types/qa';

export const COLLECTION_VAR = {
  all: { renderCollectionFilter: {} },
  byName: (value: string) => ({
    renderCollectionFilter: {
      name: value,
    },
  }),
};

export const QA_USER_VAR = {
  byCollection: (collection: string) => ({
    collection,
  }),
};

export const QA_TASK_VAR = {
  all: { qaTaskFilter: {} },
  byBatches: (
    batchId?: string[],
    assignedTo?: string,
    first?: number,
    after?: string,
    before?: string
  ) => ({
    qaTaskFilter: {
      batchId,
      assignedTo,
    },
    first,
    after,
    before,
  }),
  byBatchId: (value: string) => ({
    qaTaskId: value,
  }),
  byFilter: (
    batchId?: string,
    qaTaskIds?: string[],
    assignedTo?: string,
    search?: string,
    direction?: number,
    field?: string,
    first?: number,
    after?: string,
    before?: string,
    offset?: number
  ) =>
    direction || field
      ? {
          qaTaskFilter: {
            batchId,
            assignedTo,
            qaTaskIds,
          },
          orderBy: {
            direction,
            field,
          },
          search,
          first,
          after,
          before,
          offset,
        }
      : {
          qaTaskFilter: {
            batchId,
            assignedTo,
            qaTaskIds,
          },
          search,
          first,
          after,
          before,
          offset,
        },
};

export const QA_FRAMES_VAR = {
  byId: (batchId: string, renderId: number, renderedAssetType: RenderedAssetType) => ({
    batchId,
    renderId,
    renderedAssetType,
  }),
};

export const TRAIT_VAR = {
  all: { traitFilter: {} },
  byId: (id: string) => ({
    id: id,
  }),
};

export const BATCH_QUERY_VAR = {
  all: { batchFilter: {} },
  byCollection: (collection: string) => ({
    batchFilter: { collection },
  }),
  byBatchId: (batchId: string) => ({
    batchId,
  }),
};

export const BATCH_ACTION_VAR = {
  delete: (id: string) => ({
    batchId: id,
  }),
};

export const RENDER_TASK_VAR = {
  all: { renderTaskFilter: {} },
};

export const QA_TASK_ACTION_VAR = {
  approve: (id: string, comment?: string) => ({
    qaTaskId: id,
    comments: comment,
  }),
  fail: (id: string, mediaIssues: string[], traitIssues: TraitIssue[], comments: string) => ({
    qaTaskId: id,
    reportedIssues: mediaIssues,
    traitIssues,
    comments,
  }),
  reset: (id: string, comment: string) => ({
    qaTaskId: id,
    comments: comment,
  }),
  distribute: (id: string) => ({
    batchId: id,
  }),
  assign: (id: string, email: string) => ({
    qaTaskId: id,
    userEmail: email,
  }),
  assignBuilk: (ids: string[], email: string) => ({
    qaTaskIds: ids,
    userEmail: email,
  }),
  builkApprove: (ids: string[], comment?: string) => ({
    qaTaskIds: ids,
    comments: comment,
  }),
  builkReset: (ids: string[], comment?: string) => ({
    qaTaskIds: ids,
    comments: comment,
  }),
  builkFail: (ids: string[], issues: string[], comment?: string) => ({
    qaTaskIds: ids,
    reportedIssues: issues,
    comments: comment,
  }),
  builkPublish: (ids: string[]) => ({
    qaTaskIds: ids,
  }),
};
