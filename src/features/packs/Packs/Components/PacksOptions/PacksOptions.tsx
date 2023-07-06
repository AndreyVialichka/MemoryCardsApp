import AllOrMyPacksToggle from "./AllPacksOrMyPacksOption/AllOrMyPacksToggle";
import PacksCount from "./PacksCount/PacksCountSlider";
import PacksSearch from "./PacksSearch/PacksSearch";
import s from './styles.module.css'

type PacksOptionsPropsType = {
    options: {
        PacksSearch:string,
        AllPacksOrMyPacksOption:boolean,
        PacksCount:Array<number>
    }
}

export const PacksOptions = (props:PacksOptionsPropsType) => {
 
  return (
    <div className={s.container}>
        <PacksSearch SearchValue={props.options.PacksSearch}/>
        
        <AllOrMyPacksToggle />

        <PacksCount MinAndMaxValue={props.options.PacksCount}/>
    </div>
  );
};
