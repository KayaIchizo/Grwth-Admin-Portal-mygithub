export enum QATaskState {
  'PENDING' = 'PENDING',
  'APPROVED' = 'APPROVED',
  'FAILED' = 'FAILED',
  'PUBLISHED' = 'PUBLISHED',
}

export enum RenderedAssetType {
  'PNG' = 'PNG',
  'WEBP' = 'WEBP',
  'MP4' = 'MP4',
  'BLENDER_SCENE' = 'BLENDER_SCENE',
}

export type Trait = {
  _id: string;
  name: string;
  renderValue: string;
  publicValue: string;
  possibleIssues: string[];
  reportedIssues: string[];
};

export type TraitIssue = {
  _id: string;
  reportedIssues: string[];
};

export type RenderedAsset = {
  renderedAssetType: RenderedAssetType;
  url: string;
};

export type QATask = {
  _id: string;
  batch: string;
  batchId: string;
  collection: string;
  state: QATaskState;
  tokenId: number;
  renderId: number;
  assignedTo: string;
  traits: Trait[];
  renderedAssets: RenderedAsset[];
  baselineImages: string[];
  possibleIssues: string[];
  reportedIssues: string[];
  comments: string;
};

export type QATasks = {
  qaTasks: QATask[];
};

export type RenderCollectionInfo = {
  _id: string;
  name: string;
  renderJobTypes: string[];
  batches: Batch[];
  created: string;
  createdBy: string;
  modified: string;
  modifiedBy: string;
};

export type QAUser = {
  email: string;
  name: string;
  roles: string[];
};

export type QAUsers = {
  qaUsers: QAUser[];
};

export type RenderCollections = {
  renderCollections: RenderCollectionInfo[];
};

export type QATasksSummary = {
  totalQATasks: number;
  pendingQATasks: number;
  failedQATasks: number;
  approvedQATasks: number;
  unassignedTasks: number;
  publishedTasks: number;
};

export type Batch = {
  _id: string;
  name: string;
  collection: string;
  qaTasks: QATask[];
  qaTasksSummary: QATasksSummary;
  created: string;
  createdBy: string;
  modified: string;
  modifiedBy: string;
};

export type BatchData = {
  batch: Batch;
};

export type Batches = {
  batches: Batch[];
};

export type RenderCollectionFilter = {
  renderCollectionFilter: {
    [key: string]: string;
  };
};

export type QATasksFilter = {
  qaTaskFilter: {
    batchId?: string;
    assignedTo?: string;
    qaTaskIds?: string[];
  };
  orderBy?: {
    direction?: number;
    field?: string;
  };
  search?: string;
  first?: number;
  after?: string;
  before?: string;
  offset?: number;
};

export type QAFramesFilter = {
  batchId: string;
  renderId: number;
  renderedAssetType: RenderedAssetType;
  first?: number;
  after?: string;
  before?: string;
};

export type QATaskVar = {
  qaTaskId: string;
};

export type QATaskApproveVars = {
  variables: {
    taskId: string;
  };
  update: VoidFunction;
};

export type BatchFilter = {
  batchFilter: {
    collection?: string;
  };
};

export type BatchIdFilter = {
  batchId: string;
};

export type QAUsersVars = {
  collection: string;
};

export type QADashboardStatus = {
  batchNumber?: number;
  totalTasks: number;
  pendingTasks: number;
  failedTasks: number;
  approvedTasks: number;
  publishedTasks: number;
  unassignedTasks: number;
};

export type QAFailedReasonModal = {
  reason: { media: string[]; trait: string[] };
  comments: string;
};
