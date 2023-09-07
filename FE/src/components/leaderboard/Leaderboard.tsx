import React, { useState } from "react";
import { LeaderboardProps } from "./Leaderboard.Types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  TableContainer,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useTheme } from "@mui/material/styles";
import { ternaryOperator } from "../../utils";

const Leaderboard = (props: LeaderboardProps) => {

  const theme = useTheme();
  const [isViewAll,setIsViewAll]= useState(false)

  const {format,userStandings, standings}=props;

  const user = userStandings.filter((item:any)=>{
    return item.format==format
  })
  const players = standings.filter((item:any)=>{
    return item.title==format
  })

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head':{
      backgroundColor: theme.palette.primary.main,
      color:'white',
      padding:'16px 30px',
    },
    color: '#FFF',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    border:'none',
    padding:'9px 30px'
  }));
    
  const StyledTableRow = styled(TableRow)({
    '&.MuiTableRow-head':{
      borderRadius:'10px',
    },
    border:'none',
    backgroundColor: theme.palette.primary.light,
  });

  const ViewAllButton = styled(Button)({
    width:'213px',
    height:'36px',  
    position:'absolute',
    bottom:'12px',
    left:'576px',
    boxShadow: 'none',  
  });

  const ImgBox = styled(Box)({
    height: "289px",
    width: "286px",
    borderRadius: "10px",
    backgroundColor:`${theme.palette.primary.light}`,
  });

  const TableBox = styled(TableContainer)({
    width: "674px",
    borderRadius: "10px",
    backgroundColor:`${theme.palette.primary.light}`,
    padding:'12px',
    overflow: 'hidden',
    height:`${isViewAll ? '' : '289px'}`,
  });

  const OuterBox = styled(Box)({
    width: "1050px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'flex-start',
    padding: "30px",
    backgroundColor:`${theme.palette.primary.main}`,
    margin:'22px',
    position:'relative',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <OuterBox sx={{ display: "flex" }}>
      <ImgBox>
        <Typography variant="subtitle1">Img</Typography>
      </ImgBox>
      <TableBox>
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '440px'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                    <StyledTableCell className="tableCellHeadFirst">
                      {user[0].rank}
                    </StyledTableCell>
                    <StyledTableCell>
                      Name
                    </StyledTableCell>
                    <StyledTableCell className="tableCellHeadLast" align="right">
                      {user[0].rating}
                    </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              {ternaryOperator(
                isViewAll,
                <TableBody>
                  {players[0].topPlayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item:any,index:any)=>{
                    return(
                      <StyledTableRow key={index}>
                            <StyledTableCell>
                              {item.rank}
                            </StyledTableCell>
                            <StyledTableCell>
                              {item.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {item.rating}
                            </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>,
                <TableBody>
                {players[0].topPlayers.slice(0,5).map((item:any,index:any)=>{
                  return(
                    <StyledTableRow key={index}>
                          <StyledTableCell>
                            {item.rank}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.rating}
                          </StyledTableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
              )}
            </Table>
          </TableContainer>
          {ternaryOperator(
            isViewAll,
            <TablePagination
              component={Box}
              rowsPerPageOptions={[10, 25, 100]}
              count={players[0].topPlayers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} 
              sx={{
                color: 'white',
                '.MuiTablePagination-toolbar':{
                  paddingBottom:'10px',
                }
              }}
              backIconButtonProps={{sx:{
                '.MuiSvgIcon-root ': {
                  fill: "white",
                }
              }}}
              nextIconButtonProps={{sx:{
                '.MuiSvgIcon-root ': {
                  fill: "white",
                }
              }}}
              SelectProps={{sx:{
                '.MuiSvgIcon-root ': {
                  fill: "white",
                }
              }}}
            />,
            <></>
          )}
        </Box>
      </TableBox>
      <ViewAllButton 
        variant='contained' 
        color="primary"
        onClick={()=>{setIsViewAll(!isViewAll)}}
      >
        {ternaryOperator(isViewAll,'View Less','View More')}
      </ViewAllButton>
    </OuterBox>
  );
};

export default Leaderboard;
