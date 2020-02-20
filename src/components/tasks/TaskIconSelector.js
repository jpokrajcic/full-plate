import React from 'react';
import PropTypes from 'prop-types';
import FlashOn from '@material-ui/icons/FlashOn';
import FormatPaint from '@material-ui/icons/FormatPaint';
import Build from '@material-ui/icons/Build';
import Security from '@material-ui/icons/Security';
import Apartment from '@material-ui/icons/Apartment';
import Language from '@material-ui/icons/Language';
import BorderAll from '@material-ui/icons/BorderAll';
import TaskCategories from '../../enum/TaskCatogories';

function TaskIconSelector({categoryId}) {
  switch (categoryId) {
    case TaskCategories.GENERAL:
      return <Apartment />;
    case TaskCategories.PLUMBING:
      return <Build />;
    case TaskCategories.ELECTRICITY:
      return <FlashOn />;
    case TaskCategories.PAINT:
      return <FormatPaint />;
    case TaskCategories.SECURITY:
      return <Security />;
    case TaskCategories.GLASS:
      return <BorderAll />;
    case TaskCategories.INTERNET:
      return <Language />;
    default:
      return <Apartment />;
  }
}

TaskIconSelector.propTypes = {
  categoryId: PropTypes.number.isRequired
};

export default TaskIconSelector;
