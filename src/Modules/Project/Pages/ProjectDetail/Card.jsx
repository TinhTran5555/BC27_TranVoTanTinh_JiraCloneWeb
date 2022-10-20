import React, { Fragment } from "react";
import { ListItem,
    Divider ,
    ListItemText ,
    ListItemAvatar,
    Avatar,
    Typography,
    AvatarGroup,
    styled

} from "@mui/material";

const ListItemCss = styled(ListItem)(({ theme }) => ({
    marginBottom: "5px",
    width: '95%', maxWidth: 360,
     
      boxShadow: " #091e4240 0 1px 2px",
      backgroundColor: "#fff",
      borderRadius: "3px",
     
      cursor: "pointer",
     
      alignItems: "flex-start",
      width: '95%', maxWidth: 360,
  }));
  const AvatarGroupCss = styled(AvatarGroup)(({ theme }) => ({
   flexDirection: "column-reverse",
   marginLeft:"0px",
   alignItems: "flex-end"
}));
  const MemberAvatar = styled(Avatar)(({ theme }) => ({
   marginBottom: '-8px',
   
  }));
  const TextTaskDetail = styled(Typography)(({ theme }) => ({
    color: "black"
  
  }));
const Card = ({taskDetail}) => {
    console.log(taskDetail);
  return (
    <Fragment >
        {taskDetail?.map((task)=> (
            <Fragment key={task.taskId}>
      <ListItemCss >
        <ListItemAvatar sx={{marginLeft: "-20px"}}>
        <AvatarGroupCss max={3} >
{task?.assigness.map((member)=> (
     <MemberAvatar style={{marginLeft:"0px"}} key={member.id} alt={member.name} src={member.avatar} ></MemberAvatar>  
     ))}      
          
        </AvatarGroupCss>

        </ListItemAvatar>
        <ListItemText  sx={{marginLeft: "5px"}}
          primary={`Name: ${task?.taskName}`}
          secondary={
            <React.Fragment>
              <TextTaskDetail>Priority: {task?.priorityTask.priority}</TextTaskDetail>
     <TextTaskDetail>Type: {task?.taskTypeDetail.taskType}</TextTaskDetail>
             
            </React.Fragment>
          }
        >
            

        </ListItemText>
      </ListItemCss>
      <Divider  />
      </Fragment>
      ))}

    </Fragment>
  );
};

export default Card;

// {task?.lstTaskDeTail.map((taskDetail)=> (
//     <ItemTaskDetail key={taskDetail.taskId}>
//       <TextTaskDetail>Project Name: {taskDetail?.taskName}</TextTaskDetail>
//       <TextTaskDetail>Priority: {taskDetail?.priorityTask.priority}</TextTaskDetail>
//       <TextTaskDetail>Type: {taskDetail.taskTypeDetail.taskType}</TextTaskDetail>
//       <div style={{display: "flex"}}> Member:     
//         <AvatarGroup max={2} sx={{ml:0.5}}>  
//       {taskDetail?.assigness.map((member)=> (
//        <MemberAvatar key={member.id} alt={member.name} src={member.avatar} ></MemberAvatar>  
//       ))}                   
//       </AvatarGroup>
//       </div>
      
//     </ItemTaskDetail>
//   ))}