import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import { textAlign } from '@mui/system';
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    let text ="";

    function handleCreateNewList() {
        store.createNewList();
    }

    if (store.currentList)
        text = store.currentList.name;
   
    if(!store.currentList && auth.loggedIn)
    {
        return (
            <div style={{fontSize:'48px',textAlign:'center'}}>
                    <Fab 
                        color="primary" 
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                        style={{left:'40%'}}>
                        <AddIcon />
                    </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
        );
    }
    else{
        return (
            <div id="playlister-statusbar">
                <Typography variant="h4">{text}</Typography>
            </div>
        );
    }
}

export default Statusbar;