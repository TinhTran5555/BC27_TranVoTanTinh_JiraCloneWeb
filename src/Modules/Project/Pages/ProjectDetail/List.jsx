import React, { Fragment, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";
import Card from "./Card";

const Collum = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "calc(25% - 16px)",
  backgroundColor: "#f4f5f7",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginRight: "8px",
  minHeight: "80vh",
  paddingBottom: "20px",
  paddingLeft: "8px",

}));
const TextTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  color: "#black",
  fontSize: "0.8125rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  marginBottom: "10px"
  //  textAlign: "left",
}));

const List = ({listTask}) => {
 
 
  return (
    <Fragment>
      {listTask?.map((task) => (
        
        <Collum key={task.statusId} >
          <TextTitle>
            {task.statusName}
            <span style={{ marginLeft: "5px" }}>
              ({task.lstTaskDeTail.length})
            </span>    
          </TextTitle>
          <Card taskDetail={task.lstTaskDeTail}/>
        </Collum>
        
      ))}
      
    </Fragment>
  );
};

export default List;
