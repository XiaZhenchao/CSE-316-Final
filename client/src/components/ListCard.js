import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WorkspaceScreen from './WorkspaceScreen';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import AuthContext from '../auth'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, publish,publishDate } = props;
    let isExpend = false;
    let cardElement;
    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handlePublish(event){
        console.log("handle publish")
        store.setPublish(idNamePair._id)
    }

    function handledDelete(){
        console.log("handle delete")
    }

    function handleDuplicate()
    {
        console.log("handle duplicate")
        store.DuplicatePlaylist(store.currentList._id)
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleExpendMore(){
        console.log("Expend More!")
        isExpend = true
    }

    
    function handleExpendLess(){
        store.closeCurrentList()
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    function handleDoubleClick(event) {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleClick(event,id){
        console.log("handleClick")
        console.log("id: "+ id)
        store.setCurrentList(id)
        let length = store.getPlaylistSize()
        console.log("SongLength: "+ length)
    }

    function handlesetLike(event,id){
        // event.stopPropagation();
        console.log("handleSetLike")
        store.setLike(id)
    }

    function handlesetDislike(event,id)
    {
        // event.stopPropagation();
        console.log("handlesetDislike")
        store.setDislike(id)
    }

    if(store.currentList == null){
       if(typeof idNamePair.publishDate === 'undefined')
       {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button onClick={(event) => {
                handleLoadList(event, idNamePair._id)}}
        >
            <Grid container>
                <Grid xs ={5}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By: "+ auth.user.firstName + auth.user.lastName }</Box>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'20pt'}} />
                        </IconButton>
                <IconButton onClick={handleExpendMore} >
                    <ExpandMoreIcon style={{fontSize:'48pt'}}   
                    onClick={(event) => { handleLoadList(event, idNamePair._id)}}/>
                </IconButton>
            </Box>
        </ListItem>
       }else{
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}  
            
        >
            <Grid container>
                <Grid xs ={5}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <div>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By: "+ auth.user.firstName + auth.user.lastName }</Box>
                    <Box>
                        <IconButton onClick={(event) => {
                                handlesetLike(idNamePair._id)
                            }}>
                            <ThumbUpOffAltIcon style={{fontSize:'40px',marginLeft:'20%'}}></ThumbUpOffAltIcon>{idNamePair.like}
                        </IconButton>
                        <IconButton onClick={(event) => {
                                handlesetDislike(event,idNamePair._id)
                            }}>
                            <ThumbDownOffAltIcon style={{fontSize:'40px', marginLeft:'20%'}} ></ThumbDownOffAltIcon>
                            {idNamePair.dislike}
                        </IconButton>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'20pt'}} />
                        </IconButton>
                      
                    </Box>
                    </div>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"Published: "+ (idNamePair.publishDate).slice(0,10)}</Box>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleExpendMore} >
                    <ExpandMoreIcon style={{fontSize:'48pt'}}   
                    onClick={(event) => { handleLoadList(event, idNamePair._id)}}/>
                </IconButton>
            </Box>
        </ListItem>
       }
    } 
    else if(store.currentList._id === idNamePair._id){
        if(typeof store.currentList.publishDate === 'undefined')
        {
            cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button >
            <Grid container>
                <Grid xs ={8}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By: "+ auth.user.firstName + auth.user.lastName }</Box>
                    <Box style={{width:'700px'}}>{<WorkspaceScreen/>}</Box>
                    <div>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={handleUndo}>{"Undo"}</Button>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',left:'2%',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={handleRedo}>{"Redo"}</Button>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',left:'40%',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={(event) => {
                                handlePublish(event)
                            }}>{"Publish"}</Button>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',left:'42%',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }}>{"Delete"}</Button>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',left:'44%',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={handleDuplicate}>{"Duplicate"}</Button>

                    </div>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleExpendLess} >
                    <ExpandLessIcon style={{fontSize:'48pt'}}/>
                </IconButton>
            </Box>
        </ListItem>
        }
        else{
            cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button   >
            <Grid container>
                <Grid xs ={8}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <div>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By: "+ auth.user.firstName + auth.user.lastName }</Box>
                    <Box>
                        <IconButton onClick={(event) => {
                                handlesetLike(idNamePair._id)
                            }}>
                            <ThumbUpOffAltIcon style={{fontSize:'40px',marginLeft:'20%'}}></ThumbUpOffAltIcon>{idNamePair.like}
                        </IconButton>
                        <IconButton onClick={(event) => {
                                handlesetDislike(event,idNamePair._id)
                            }}>
                            <ThumbDownOffAltIcon style={{fontSize:'40px', marginLeft:'20%'}} ></ThumbDownOffAltIcon>
                            {idNamePair.dislike}
                        </IconButton>
                    </Box>
                    </div>
                    <Box style={{width:'700px'}}>{<WorkspaceScreen/>}</Box>
                    <div>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',left:'75%',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }}>{"Delete"}</Button>
                            <Button style={{color:'black',fontWeight:'bold',fontSize:'15px',width:'100px',marginTop:'20px',left:'80%',
                            border:'1px solid black',borderRadius:'15px',textAlign:'center',backgroundColor:'#e1e4cb'}}
                            onClick={handleDuplicate}>{"Duplicate"}</Button>

                    </div>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"Published: "+(idNamePair.publishDate).slice(0,10)}</Box>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleExpendLess} >
                    <ExpandLessIcon style={{fontSize:'48pt'}}/>
                </IconButton>
            </Box>
        </ListItem>
        }
    }
    else{
        console.log("handle final stage")
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button >
            <Grid container>
                <Grid xs ={5}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <div>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By: "+ auth.user.firstName + auth.user.lastName }</Box>
                    <Box>
                    <IconButton >
                            <ThumbUpOffAltIcon style={{fontSize:'40px',marginLeft:'20%'}}/>
                        </IconButton>
                        <IconButton>
                            <ThumbDownOffAltIcon style={{fontSize:'40px', marginLeft:'20%'}}/>
                        </IconButton>
                    </Box>
                    </div>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"Published: "+ (store.currentList.publishDate?store.currentList.publishDate.slice(0,10):null)}</Box>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleExpendMore} >
                    <ExpandMoreIcon style={{fontSize:'48pt'}}   
                    onClick={(event) => { handleLoadList(event, idNamePair._id)}}/>
                </IconButton>
            </Box>
        </ListItem>
    }

    if (editActive) {
        cardElement =
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={"list-" + idNamePair._id}
                    label="Playlist Name"
                    name="name"
                    autoComplete="Playlist Name"
                    className='list-card'
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    defaultValue={idNamePair.name}
                    inputProps={{style: {fontSize: 48}}}
                    InputLabelProps={{style: {fontSize: 24}}}
                    autoFocus
                >
                </TextField>


    }
    return (
        cardElement

    );


    
}

export default ListCard;