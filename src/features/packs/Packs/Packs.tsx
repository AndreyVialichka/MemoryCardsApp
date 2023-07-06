import { ChangeEvent, useEffect, useState } from "react";
import { useActions, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import s from "./styles.module.css";
import { packsSelector, packsOptionsSelector, userIDSelector, totalPacksSelector, pageTotalSelector } from "features/packs/packs.selector";
import PacksTable from "./Components/PacksTable/PacksTable";
import AddPackModal from "./Components/PacksModals/AddPackModal";
import { useDebounce } from "common/hooks/useDebounse";
import { PacksOptions } from "./Components/PacksOptions/PacksOptions";
import { Pagination, Typography } from "@mui/material";

export const Packs = () => {
  const cardPacks = useAppSelector(packsSelector);
  const searchOptions = useAppSelector(packsOptionsSelector)
  const user_id = useAppSelector(userIDSelector)
  const totaPacksCount = useAppSelector(totalPacksSelector)
  const pageTotal = useAppSelector(pageTotalSelector)
  
  let totalPages = Math.round(totaPacksCount / pageTotal)

  const [page, setPage] = useState(1);

  const debouncedValue = useDebounce<string>(searchOptions.PacksSearch, 500)

  const { fetchPacks } = useActions(packsThunks);
  
  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    debugger
		setPage(page)
	};
    useEffect(() => {
      fetchPacks({
          max: searchOptions.PacksCount[1],
          min:searchOptions.PacksCount[0],
          packName:searchOptions.PacksSearch,
          user_id: searchOptions.AllPacksOrMyPacksOption ? user_id : '',
          page:page,
          pageCount:pageTotal 

        });

    }, [debouncedValue,searchOptions.AllPacksOrMyPacksOption,searchOptions.PacksCount[0],searchOptions.PacksCount[1],page]);

  return (
    <div className={s.container}>
      <Typography id="modal-modal-title" variant="h4" component="h1">PACKS LIST</Typography>
      {user_id && <AddPackModal />}
      
      <PacksOptions options={searchOptions} />
      <div className={s.table}>
        <PacksTable packs={cardPacks} />
      </div>
      <Pagination count={totalPages} onChange={changePageHandler}/>
    </div>
  );
};
