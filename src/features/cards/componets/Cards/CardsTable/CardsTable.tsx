import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardType } from "features/cards/service/cards.api.types";
import SchoolIcon from "@mui/icons-material/School";
import { IconButton } from "@mui/material";
import EditCardModal from "../CardsModals/EditCardModal";
import DeleteCardModal from "../CardsModals/DeleteCardModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "common/hooks";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

type CardsTablePropsType = {
  cards?: Array<CardType>;
  page: number;
  pageCount: number;
  packID?: string;
};

const StartGrade = (grade: any) => {
  let startArr = [];
  for (let i = 0; i <= 5; i++) {
    if (i <= grade.grade) {
      startArr.push(1);
    } else {
      startArr.push(0);
    }
  }

  return startArr;
};

const Stars = (grade: any) => {
  let arr = StartGrade(grade);
  return (
    <div>
      {arr.map((grade) => (grade === 1 ? <StarIcon /> : <StarBorderIcon />))}
    </div>
  );
};

export default function CardsTable(props: CardsTablePropsType) {
  const navigate = useNavigate();

  const userID = useAppSelector((state) => state.auth.profile?._id);

  const handleNavigateToLearn = (id: string | undefined) => {
    navigate(`/learn/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "90%", m: "40px" }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#efefef" }}>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards &&
            props.cards.map((card) => (
              <TableRow
                key={card._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {card.question}
                </TableCell>
                <TableCell align="right">{card.answer}</TableCell>
                <TableCell align="right">{card.updated}</TableCell>
                <TableCell align="right">
                  <Stars grade={card.grade} />
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    aria-label="learn"
                    onClick={() => {
                      handleNavigateToLearn(props.packID);
                    }}
                  >
                    <SchoolIcon />
                  </IconButton>
                  {userID === card.more_id ? (
                    <>
                      <EditCardModal card={card} key={card._id} />
                      <DeleteCardModal
                        card={card}
                        page={props.page}
                        pageCount={props.pageCount}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
