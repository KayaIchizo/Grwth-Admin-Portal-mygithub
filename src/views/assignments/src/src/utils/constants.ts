export const collectionImages: { [key: string]: string } = {
  Fluf: 'https://flufs-compress-webp.s3.amazonaws.com/1_864_864.webp',
  'Party Bears': 'https://partybears-compress-webp.s3.amazonaws.com/5539_864_864.webp',
  Seekers:
    'https://autbcmlsgr.cloudimg.io/nft.seekers.xyz/seekers/0/still/0_1080_bg.png?w=800&h=800&force_format=webp',
  Buzzies: 'https://buzzies.flufworld.io/Ozide.webp',
};

export const navAccountAvatarMenu = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '/',
  },
  {
    label: 'Settings',
    linkTo: '/',
  },
];

export const renderJobStatus = {
  all: 'all',
  pending: 'pending',
  failed: 'failed',
  approved: 'approved',
  published: 'published',
};

export enum NotifyMessages {
  'APPROVED' = 'Approved successfully',
  'RESET' = 'Reset successfully',
  'FAILED' = 'Failed successfully',
  'ASSIGN' = 'Assigned successfully',
  'DISTRIBUTE' = 'QA Tasks Distributed successfully',
  'BUILK_APPROVE' = 'Builk QATasks approved successfully',
  'BUILK_RESET' = 'Builk QATasks reset successfully',
  'BUILK_FAILED' = 'Builk QATasks failed successfully',
  'DELETE_BATCH' = 'Batch was deleted successfully',
  'BUILK_PUBLISH' = 'Builk QATasks published successfully',
}
