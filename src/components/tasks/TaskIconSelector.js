import React from 'react';
import FlashOn from '@material-ui/icons/FlashOn';
import FormatPaint from '@material-ui/icons/FormatPaint';
import Build from '@material-ui/icons/Build';
import VpnKey from '@material-ui/icons/VpnKey';
import Domain from '@material-ui/icons/Domain';
import TaskCategories from '../../enum/TaskCatogories';

const TaskIconSelector = props => {
  switch (props.categoryId) {
    case TaskCategories.ELECTRICITY:
      return <FlashOn />;
    case TaskCategories.PAINT:
      return <FormatPaint />;
    case TaskCategories.PLUMBING:
      return <Build />;
    case TaskCategories.SECURITY:
      return <VpnKey />;
    default:
      return <Domain />;
  }
};

export default TaskIconSelector;
