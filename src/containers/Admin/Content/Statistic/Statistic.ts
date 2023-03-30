import { connect } from "react-redux";

import Statistic from "../../../../components/Admin/Content/Statistic/Statistic";

import { setTitle } from "../../../../app/Admin/Header/Header";
import {
  getCard,
  getLine,
  getPie,
  getTree,
} from "../../../../app/API/Statistic/Statistic";

const mapStatesToProps = (state: any) => {
  return {
    card: state.statistic.card,
    line: state.statistic.line,
    pie: state.statistic.pie,
    tree: state.statistic.tree,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getCard,
  getLine,
  getPie,
  getTree,
};

export default connect(mapStatesToProps, mapActionsToProps)(Statistic);
