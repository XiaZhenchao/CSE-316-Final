import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import YouTubePlayerExample from './PlaylisterYouTubePlayer';
import { Tab, Tabs } from '@mui/material';
import YouTubePlayer from './PlaylisterYouTubePlayer';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    
    function handleCommentViewButton(){
        console.log("Comment")
    }
    function handleYoutuplayerViewButton(){
        console.log("YouTube player")
    }

    let value = 0;
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography> */}
            </div>
             <div style={{fontSize: '30pt'}}>
                <HomeIcon style={{fontSize: '48pt'}}/>
                <PersonIcon style={{fontSize: '48pt'}}/>
                <GroupsIcon style={{fontSize: '48pt'}}/>
                <TextField id="filled-basic" label="Search" variant="filled" style={{left:'10%',width:'800px', backgroundColor:'#FFFFFF'}}/>
                <span style={{marginLeft: '20%',fontSize:'40pt'}}>SORT BY</span>
                <SortIcon style={{fontSize: '48pt',right:'40%'}}/>
            </div>



                <Grid container spacing={0} >
                    <Grid item xs={7} >
                    <div id="list-selector-list">
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                    </div>
                    </Grid>

                    <Grid item xs={5} >
                    {/* <div>
                            <YouTubePlayerExample />
                    </div> */}
                    {/* <Tabs textColor='primary' value={value}>
                        <Tab label = "Player">
                            <YouTubePlayer />
                        </Tab>
                        <Tab label="Comment"/>
                    </Tabs> */}
                   <div>
                    <button style={{fontSize: '30px', width:'150px',backgroundColor:'#A9A9A9'}} onClick ={handleYoutuplayerViewButton}>
                            Player
                        </button>
                        <button style={{fontSize: '30px', width:'150px'}} onClick= {handleCommentViewButton}>
                            Comment
                        </button>
                   </div>
                    <YouTubePlayer />
                    </Grid>

                </Grid>

   


        </div>)
}

export default HomeScreen;