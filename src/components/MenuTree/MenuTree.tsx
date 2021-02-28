import React from 'react';
import {connect} from "react-redux";

import './MenuTree.scss';

interface IMenuTreeProps {
  handleSelection: Function;
  showMenuTree?: boolean;
}

const MenuTree = (props: IMenuTreeProps) => {
  const { handleSelection, showMenuTree } = props;

  const showMenuTreeClass = showMenuTree ? "show" : "";

  return (
    <div className={`menuTreeWrapper ${showMenuTreeClass}`}>
      <div
        className="focus-on-usa"
        onClick={() => handleSelection()}
      >Show Continental US
      </div>
      <div>resource</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(MenuTree);
