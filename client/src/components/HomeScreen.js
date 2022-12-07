import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import {useState } from 'react';
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
import { IconButton, Tab, Tabs } from '@mui/material';
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
    // let PageState = "HOME";
    const [PageState, setPageState] = useState("HOME");
    const [KeyWord,setKeyWord] = useState("");

    function handleCreateNewList() {
        store.createNewList();
    }
    
    function handleCommentViewButton(){
       store.YoutubeStateComment()
       console.log("Comment")
    }
    function handleYoutuplayerViewButton(){
        store.YoutubeStatePlayer();
    }

    function handleHomeScreenView(){
        setPageState("HOME")
        setKeyWord("")
        // PageState = "HOME"
    }

    function handleAllListScreenView(){
        // PageState = "GROUP"
        setPageState("GROUP")
        setKeyWord("")
    }

    function handleUserListScreenView(){
        // PageState = "USER"
        setPageState("USER")
        setKeyWord("")
    }

    function handleSearchInput(event){
        if(event.keyCode == 13){
            let temp = event.target.value
            setKeyWord(temp)
            console.log("The key word is: "+ KeyWord)
        }
    }


    let value = 0;
    let listCard = "";
    if (store) {
       if(PageState == 'HOME')
       {
        if(KeyWord == "")
        {
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#6495ED' }}>
            {
                store.idNamePairs.map((pair) => (
                   <div>
                     <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                   </div>
                ))
            }
            </List>;
        }
        else{
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#6495ED' }}>
            {
                store.idNamePairs.filter(pair => pair.name == KeyWord).map((pair) => (
                   <div>
                     <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                   </div>
                ))
            }
            </List>;
        }
       }
       else if(PageState != "HOME"){
         if(KeyWord == "")
         {
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#6495ED' }}>
            {
                store.idNamePairs.filter(pair => typeof pair.publishDate !== 'undefined').map((pair) => (
                   <div>
                     <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                   </div>
                ))
            }
            </List>;
         }
         else{
            if(PageState == "USER"){
                listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#6495ED' }}>
                {
                    store.idNamePairs.filter(pair => typeof pair.publishDate !== 'undefined' && pair.name == KeyWord).map((pair) => (
                       <div>
                         <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                       </div>
                    ))
                }
                </List>;
            }

            if(PageState == "GROUP"){
                listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#6495ED' }}>
                {
                    store.idNamePairs.filter(pair => typeof pair.publishDate !== 'undefined' && pair.name == KeyWord).map((pair) => (
                       <div>
                         <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                       </div>
                    ))
                }
                </List>;
            }

         }
       }
    }



    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            </div>
             <div style={{fontSize: '30pt'}}>
                <IconButton onClick={handleHomeScreenView}>
                    <HomeIcon style={{fontSize: '45pt'}}  />
                </IconButton>
                
                <IconButton onClick={handleUserListScreenView}>
                    <PersonIcon style={{fontSize: '45pt'}}/>
                </IconButton>
                <IconButton onClick={handleAllListScreenView}>
                    <GroupsIcon style={{fontSize: '45pt'}}/>
                </IconButton>
                <TextField id="filled-basic" label="Search" variant="filled" style={{left:'10%',width:'800px', backgroundColor:'#FFFFFF'}}
                onKeyDown = {handleSearchInput}/>
                <span style={{marginLeft: '20%',fontSize:'40pt'}}>SORT BY</span>
                <SortIcon style={{fontSize: '45pt',right:'40%'}}/>
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