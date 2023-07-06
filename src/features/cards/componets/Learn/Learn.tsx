import { Box, Button, Checkbox, FormControlLabel, IconButton, LinearProgress, Typography } from "@mui/material";
import { useGetCardsQuery, useUpdateGradeMutation } from "features/cards/service/cards.api";
import { CardType } from "features/cards/service/cards.api.types";
import React, {useEffect, useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    debugger
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)
    console.log(cards[res.id + 1])

    return cards[res.id + 1];
}

const Learn = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    // const [first, setFirst] = useState<boolean>(0);
    let {packId} = useParams<{ packId: string }>();

    const {data, isLoading, error,refetch} = useGetCardsQuery({packId: packId ?? "",pageCount:100  }	)
    const [updateGrade] = useUpdateGradeMutation()
    const navigate = useNavigate()
    const [grade,setGrage] = useState(1)
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        comments:'',
        type: '',
        rating: 0,
        more_id: '',
        __v:0,
        created: '',
        updated: '',
    });


    useEffect(() => {
        console.log('LearnContainer useEffect');


        
        if (data && data?.cards.length > 0) setCard(getCard(data.cards));


    }, [isLoading]);

    const onNext = () => {
        setIsChecked(false);

        if (data && data.cards.length > 0) {
            // dispatch
            setCard(getCard(data.cards));
        } else {

        }
        updateGradeHandler(grade,card._id)
    }

    const updateGradeHandler = (grade:number,cardID:string) => {
        let newGrade = {
            grade,
			card_id: cardID
        }
        updateGrade(newGrade)
    }

    const handleBackToPackList = () => {
        navigate('/packs')
    }

    const gradeHandler = (gradeValue:number) => {
        setGrage(gradeValue)
    }


    if(isLoading) return <LinearProgress />

    return (
        <div>
            <IconButton aria-label="create" onClick={handleBackToPackList}>
                    <ArrowBackIcon /><b>Back to pack list</b>
        	</IconButton>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{width:'30%', m:'auto', marginTop:'50px', textAlign:"center"}}>
            <b>Learn {data?.packName} pack</b>
            </Typography>
            <Box sx={ 
            { 
              display:'flex',
              flexDirection:'column',
              width:'30%',
              alignItems:'center',
              gap:"20px", 
              backgroundColor:"white",
              m:'auto',
              marginTop:'40px',
              padding:'20px'
              
            }} >
           <Typography id="modal-modal-title" variant="h6" component="h2">
            <b >Question:</b> {card.question} 
          </Typography>
          <Typography id="modal-modal-title" variant="subtitle1" component="p" color='#a8a8a8'>
            You try to anwer this card {card.shots} times
          </Typography>
            <div>
                <Button variant="contained"onClick={() => setIsChecked(true)}>check</Button>
            </div>

            {isChecked && (
                <>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <b >Answer:</b> {card.answer} 
                    </Typography>
                    <Box sx={{display:'flex',flexDirection:'column'}}>
                        {grades.map((g, i) => (
                            <FormControlLabel
                                label = { g}
                                control = {<Checkbox   key={'grade-' + i}  onChange={() => {
                                gradeHandler(i+1)
                                }}></Checkbox >}
                            />    

                        ))}
                    </Box>
                    <div><Button variant="contained" onClick={onNext}>next</Button></div>
                </>
            )}
        </Box>    
        </div>
    );
};

export default Learn;