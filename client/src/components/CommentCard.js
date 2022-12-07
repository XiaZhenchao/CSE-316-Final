import { Box } from '@mui/system';

function CommentCard(props){
    const { username,comment } = props
    console.log("comments test: "+ comment)
    return (<Box style={{background:"lightyellow", border: '2px solid #999999'}}>
   <Box style={{fontSize: '15px',marginTop:'3%',marginLeft:'2%'}}>{"By: "+ username}</Box>
   <Box style={{fontSize: '20px',marginTop:'3%',marginLeft:'2%',width:'60%'}}>{comment}</Box>
    

    </Box>)
}

export default CommentCard;