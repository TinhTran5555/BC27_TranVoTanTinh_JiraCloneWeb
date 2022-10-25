<Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ textAlign: "left" }}>
            <Box sx={{ maxWidth: 120 , width: 100}}>
             
                <InputLabel id="taskTypeLable" >{taskTypeDetail?.taskType}</InputLabel>
                <Select
                  labelId="taskTypeLable"
                  id="demo-simple-select"
                  name="typeId"
                  value={typeTask}
                  label="typeTask"
                  onChange={handleChange}
                  
                >
                  <MenuItem value="1">Bug</MenuItem>
                  <MenuItem value="2">New Task</MenuItem>
                  
                </Select>
              
            </Box>
            {/* <TextField
              sx={{ marginTop: "5px", width: "30%", fontSize:"16px" }}
              value={taskName}
              name="taskName"
              onChange={handleChange}
              placeholder="Input your project's name"
/> */}
            <TitleStyle>Description</TitleStyle>
            <Box marginBottom={2}>
              <Editor
                initialValue="{project?.description}"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={handleEditorChange}
              />
            </Box>
            <TitleStyle>Comments</TitleStyle>

            <Grid
              marginTop={1}
              marginLeft={2}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Avatar src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"></Avatar>
              <Typography variant="h6" component="h6" marginLeft={2}>
                NAME
              </Typography>
            </Grid>
            <TextField
              sx={{ marginLeft: "20px", marginTop: "5px", width: "95%" }}
            ></TextField>
            <Box marginTop={2}>
              <Button variant="contained" color="success">
                Update
              </Button>
              <Button
                sx={{ marginLeft: "5px" }}
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ textAlign: "right" }}>
            <Button onClick={() => {}} color="primary">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Box>
          <Box sx={{ textAlign: "left" }}>

            <BoxStyle>
              <TitleStyle>ASSIGNEES</TitleStyle>
              <Grid container rowSpacing={1}>
                <Grid container item xs={5}>
                  {" "}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: colors.teal[100],
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"
                    ></Avatar>
                    <Typography sx={{ fontSize: "16px" }} marginLeft={1}>
                      NAME
                    </Typography>
                    <button
                      style={{
                        width: "20px",
                        border: "none",
                        backgroundColor: colors.teal[100],
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </Box>
                </Grid>
                <Grid container item xs={4}>
                  {" "}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: colors.teal[100],
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"
                    ></Avatar>
                    <Typography sx={{ fontSize: "16px" }} marginLeft={1}>
                      NAME
                    </Typography>
                    <button
                      style={{
                        width: "20px",
                        border: "none",
                        backgroundColor: colors.teal[100],
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </Box>
                </Grid>
                <Grid container item xs={4}>
                  {" "}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: colors.teal[100],
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"
                    ></Avatar>
                    <Typography sx={{ fontSize: "16px" }} marginLeft={1}>
                      NAME
                    </Typography>
                    <button
                      style={{
                        width: "20px",
                        border: "none",
                        backgroundColor: colors.teal[100],
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </Box>
                </Grid>
              </Grid>
            </BoxStyle>
            {/* <Box sx={{ marginTop: "90px" }}>
              <TitleStyle>REPORTER</TitleStyle>
              <Button
                sx={{
                  fontWeight: 400,
                  backgroundColor: colors.teal[100],
                  color: "#000",
                }}
                aria-describedby={id}
                variant="text"
                onClick={handleClick}
              >
                Name Type Text
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={typeTask}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem sx={{ width: 151 }} onClick={handleSelected}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSelected}>My account</MenuItem>
                <MenuItem onClick={handleSelected}>Logout</MenuItem>
              </Popover>
            </Box> */}
            <BoxStyle>
              <Typography>abcsacs</Typography>
              <Typography>abcsacs</Typography>
            </BoxStyle>
          </Box>
        </Grid>
      </Grid>