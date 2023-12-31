import { useGetCardsQuery } from "features/cards/service/cards.api";
import { useNavigate, useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import AddCardModal from "./CardsModals/AddCardModal";
import CardsTable from "./CardsTable/CardsTable";
import CardsSearch from "./CardsOptions/CardsSearch";
import { useDebounce } from "common/hooks/useDebounse";
import { userIDSelector } from "features/packs/packs.selector";
import { useAppSelector } from "common/hooks/useAppSelector";
import EmptyCard from "./CardsTable/EmptyCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Cards = () => {
  let { packId } = useParams<{ packId: string }>();
  let [searchValue, setSearchValue] = useState("");

  const user_id = useAppSelector(userIDSelector);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(100);
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetCardsQuery({
    packId: packId ?? "",
    page,
    pageCount,
    cardQuestion: debouncedValue,
  });

  useEffect(() => {
    refetch();
  }, [debouncedValue, refetch]);

  const handleChangeSearchValue = (Question: string) => {
    setSearchValue(Question);
  };

  const handleBackToPackList = () => {
    navigate("/packs");
  };

  if (error) {
    const err = error as any;
    return <h1 style={{ color: "red" }}>{err.data.error}</h1>;
  }
  if (data?.cards.length === 0) {
    return <EmptyCard userID={data.packUserId} />;
  }

  return (
    <div className={s.container}>
      {isLoading && <LinearProgress />}
      <IconButton aria-label="create" onClick={handleBackToPackList}>
        <ArrowBackIcon />
        <b>Back to pack list</b>
      </IconButton>
      <div className={s.cardsOptions}>
        <Typography id="modal-modal-title" variant="h4" component="h1">
          PACK {data?.packName}
        </Typography>
        {user_id && <AddCardModal />}
      </div>

      <CardsSearch
        handleChangeSearchValue={handleChangeSearchValue}
        Question={searchValue}
      />
      <CardsTable
        cards={data?.cards}
        page={page}
        pageCount={pageCount}
        packID={packId}
      />
    </div>
  );
};
