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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import WorkspaceScreen from './WorkspaceScreen';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    let isExpend = false;
    let cardElement;

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

    if(store.currentList == null){
        console.log("currentlist test")
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button
        >
            <Grid container>
                <Grid xs ={5}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By:   Zhenchao Xia"}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"Published: Jan5, 2019 "+isExpend}</Box>
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
    else if(store.currentList._id === idNamePair._id){

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
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By:   Zhenchao Xia"}</Box>
                    {/* <Box id = "Expend-list-Card" style={{fontSize:'20px',marginTop:'3%',padding:'5px',
                    border:'5px solid black',borderRadius:'10px',color:'white',width:'500px'}}>{"1.Fast train by Solomon Burke"}</Box> */}
                    <Box>{<WorkspaceScreen/>}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"Published: Jan5, 2019 "}</Box>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleExpendLess} >
                    <ExpandLessIcon style={{fontSize:'48pt'}}/>
                </IconButton>
            </Box>
        </ListItem>
        console.log("done")
    }
    else{
        console.log("handle final stage")
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '40pt',marginBottom: '5px',border:'5px solid black',backgroundColor:'lightyellow',borderRadius:'10px'}}
            button>
            <Grid container>
                <Grid xs ={5}>
                    <div>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"By:   Zhenchao Xia"}</Box>
                    <Box style={{fontSize: '20px',marginTop:'3%'}}>{"Published: Jan5, 2019 "+isExpend}</Box>
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

    // if (editActive) {
    //     cardElement =
    //             <TextField
    //                 margin="normal"
    //                 required
    //                 fullWidth
    //                 id={"list-" + idNamePair._id}
    //                 label="Playlist Name"
    //                 name="name"
    //                 autoComplete="Playlist Name"
    //                 className='list-card'
    //                 // onKeyPress={handleKeyPress}
    //                 // onChange={handleUpdateText}
    //                 defaultValue={idNamePair.name}
    //                 inputProps={{style: {fontSize: 48}}}
    //                 InputLabelProps={{style: {fontSize: 24}}}
    //                 autoFocus
    //             >
    //             </TextField>


    //}
    return (
        cardElement

    );


    
}

export default ListCard;