import React from 'react'
import { useTheme, styled, Box, Typography, Button, TextField } from '@mui/material';
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';

const height = (window.innerHeight-120)*80/100;

const TimeControls = (props:{variant:string}) => {
    const [room,setRoom] = React.useState<number|undefined>(undefined)
    const [time,setTime] = React.useState<number|undefined>(undefined)
    const [isDisabled, setIsDisabled]= React.useState([false,false,false,false,false,false,false,false,false])
    const [isRoomValid, setIsRoomValid] = React.useState({validity:true, error:''})
    let myColor = '';
    const theme = useTheme()
    const navigate = useNavigate();

    const handleTimeChange = (index: number,newValue: string) => {
        const value=parseFloat(newValue);
        let arr = new Array(9).fill(false);
        arr[index]=true;
        setIsDisabled(arr);
        setTime(value);
    };
    const handlePlayFriend = ()=>{
        socket.connect();
        socket.emit('join_room', {room: room, time: time} , (data:any)=>{
            if(data.error){
                setIsRoomValid({validity:false,error:data.error});
            }
            else{
                myColor=data.color;
                setIsRoomValid({validity:true,error:''});
                navigate(props.variant,{state:{color:myColor, time:time, room:room}});
            }
        })
    };

    const handleRoomInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setRoom(parseInt(event.target.value));
    }
    
    
    const OuterBox=styled(Box)({
        width:'415px',   
        height:`${height}px`,
        padding:'20px',
        backgroundColor:theme.palette.primary.dark,
        borderRadius:'10px',
    })  
    
    const InnerBox=styled(Box)({
        width:'100%',
        height: '70%',
        backgroundColor:theme.palette.primary.light,
        borderRadius:'10px',
        padding:'15px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    })

    return (
        <OuterBox>
            <InnerBox>
                <Box sx={{width:'100%',height:'25%'}}>
                    <Typography variant='h3'>Bullet</Typography>
                    <Box marginTop={2} marginBottom={2} sx={{display:'flex', justifyContent:'space-between',height:'50%'}}>
                        <Button 
                            disabled={isDisabled[0]}
                            color='primary' 
                            variant='contained' 
                            sx={{width:'32%'}} 
                            value={0.5} 
                            onClick={(e)=>{handleTimeChange(0,e.currentTarget.value)}}>
                                <Typography>30 sec</Typography>
                        </Button>
                        <Button disabled={isDisabled[1]} color='primary' variant='contained' sx={{width:'32%'}} value={1} onClick={(e)=>{handleTimeChange(1,e.currentTarget.value)}}><Typography>1 min</Typography></Button>
                        <Button disabled={isDisabled[2]} color='primary' variant='contained' sx={{width:'32%'}} value={2} onClick={(e)=>{handleTimeChange(2,e.currentTarget.value)}}><Typography>2 min</Typography></Button>
                    </Box>
                </Box>
                <Box sx={{ width:'100%',height:'25%' }}>
                    <Typography variant='h3'>Blitz</Typography>
                    <Box marginTop={2} marginBottom={2} sx={{display:'flex', justifyContent:'space-between',height:'50%'}}>
                        <Button disabled={isDisabled[3]} color='primary' variant='contained' sx={{width:'32%'}} value={3} onClick={(e)=>{handleTimeChange(3,e.currentTarget.value)}}><Typography>3 min</Typography></Button>
                        <Button disabled={isDisabled[4]} color='primary' variant='contained' sx={{width:'32%'}} value={5} onClick={(e)=>{handleTimeChange(4,e.currentTarget.value)}}><Typography>5 min</Typography></Button>
                        <Button disabled={isDisabled[5]} color='primary' variant='contained' sx={{width:'32%'}} value={7} onClick={(e)=>{handleTimeChange(5,e.currentTarget.value)}}><Typography>7 min</Typography></Button>
                    </Box>
                </Box>
                <Box sx={{ width:'100%',height:'25%' }}>
                    <Typography variant='h3'>Rapid</Typography>
                    <Box marginTop={2} marginBottom={2} sx={{display:'flex', justifyContent:'space-between',height:'50%'}}>
                        <Button disabled={isDisabled[6]} color='primary' variant='contained' sx={{width:'32%'}} value={10} onClick={(e)=>{handleTimeChange(6,e.currentTarget.value)}}><Typography>10 min</Typography></Button>
                        <Button disabled={isDisabled[7]} color='primary' variant='contained' sx={{width:'32%'}} value={15} onClick={(e)=>{handleTimeChange(7,e.currentTarget.value)}}><Typography>15 min</Typography></Button>
                        <Button disabled={isDisabled[8]} color='primary' variant='contained' sx={{width:'32%'}} value={20} onClick={(e)=>{handleTimeChange(8,e.currentTarget.value)}}><Typography>20 min</Typography></Button>
                    </Box>
                </Box>
                <Box sx={{ width:'100%',height:'25%' }}>
                    <Typography variant='h3'>Enter Room</Typography>
                    <Box marginTop={2} marginBottom={2} sx={{display:'flex', justifyContent:'center',height:'50%'}}>
                        <TextField 
                            autoFocus
                            id='roomInput'
                            error={isRoomValid.validity? false: true}
                            helperText={isRoomValid.error}
                            variant='filled' 
                            hiddenLabel
                            required 
                            type='number'
                            value={room}
                            onChange={handleRoomInput}
                        />
                    </Box>
                </Box>
            </InnerBox>
            <Button 
                variant='contained' 
                color='secondary'
                sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
                onClick={handlePlayFriend}
            >
                <Typography variant='h2'>Play a friend</Typography>
            </Button>
            <Button 
                variant='contained' 
                color='secondary'
                sx={{height:'12%',width:'100%',margin:'3% 0 0 0'}}
            >
                <Typography variant='h2'>Play</Typography>
            </Button>
        </OuterBox>
    )
}

export default TimeControls