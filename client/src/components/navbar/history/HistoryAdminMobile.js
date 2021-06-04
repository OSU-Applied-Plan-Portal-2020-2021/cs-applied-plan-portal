/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import styled from "@emotion/styled";
import {PropTypes} from "prop-types";
import {useState} from "react";
import HistoryMenuModal from "../admin_nav/HistoryMenuModal";

const Container = styled.div``;
const StyledBtn = styled.button`
  &:hover {
    background: rgba(0, 0, 0, 0.15) !important;
  }
`;
function HistoryAdminMobile({recentPlans}) {

  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpenClick = () => {
    setIsOpen(!isOpen);
  };
  console.log(recentPlans);
  return (
    <Container>
      <StyledBtn onClick={handleOnOpenClick}>History</StyledBtn>
      <HistoryMenuModal
        isOpen={isOpen}
        handleClose={handleOnOpenClick}
        list={recentPlans}
      />
    </Container>
  );
}

export default HistoryAdminMobile;

HistoryAdminMobile.propTypes = {
  recentPlans: PropTypes.array,
};
