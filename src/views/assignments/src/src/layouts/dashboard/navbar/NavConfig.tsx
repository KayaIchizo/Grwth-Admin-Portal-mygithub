// routes
import { PATH_ROUTE } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: getIcon('ic_dashboard'),
  renderTool: getIcon('ic_render_tool'),
  qaTool: getIcon('ic_qa_tool'),
  publisher: getIcon('ic_publisher'),
  setting: getIcon('ic_setting'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'QA Section',
    items: [
      { title: 'Dashboard', path: PATH_ROUTE.root, icon: ICONS.dashboard },
      { title: 'My tasks', path: PATH_ROUTE.qaTool.root, icon: ICONS.qaTool },
    ],
  },
];

export default navConfig;
