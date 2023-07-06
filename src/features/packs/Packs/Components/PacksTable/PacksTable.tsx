import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PackType } from 'features/packs/packs.api';
import { IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EditModal from '../PacksModals/EditModal';
import DeletePackModal from '../PacksModals/DeletePackModal';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'common/hooks';
import s from './styles.module.css'
type packsTablePropsType = {
    packs : PackType[]
}


function PacksTable(props:packsTablePropsType) {
    const navigate = useNavigate()
    const userID = useAppSelector((state) => state.auth.profile?._id);


    const handleNavigateToCard = (id:string) => {
        navigate(`/cards/${id}`);
    }

    const handleNavigateToLearn = (id:string | undefined) => {
      navigate(`/learn/${id}`);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth:"90%",m:'40px' }} aria-label="simple table">
        <TableHead sx={{ backgroundColor:'#efefef'}}>
          <TableRow >
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.packs.map((pack) => (
            <TableRow
              key={pack._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } } }
            >
              <TableCell 
                component="th"
                scope="row"
                onClick={() =>{ handleNavigateToCard(pack._id) }}
                >
                {pack.name}
              </TableCell>
              <TableCell align="right">{pack.cardsCount}</TableCell>
              <TableCell align="right">{pack.updated}</TableCell>
              <TableCell align="right">{pack.user_name}</TableCell>
              <TableCell align="right" sx={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
                <IconButton aria-label="learn" onClick={() => {handleNavigateToLearn(pack._id)}}>
                    <SchoolIcon />
                </IconButton>
                {userID === pack.user_id 
                  ? <> 
                  <EditModal pack={pack} key={pack._id}/>
                  <DeletePackModal packID={pack._id} />
                  </>
                  : <></>  }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default PacksTable