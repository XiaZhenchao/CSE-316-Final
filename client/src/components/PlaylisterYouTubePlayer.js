import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { IconButton } from '@mui/material';
import PlayMusicIcon from '@mui/icons-material/PlayArrowRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';


export default function YouTubePlayer() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "cPWBG6_jn4Y",
        "V8RkqQ8fQs4",
        "z2vaSlpliEs"
    ];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }
    
    function decSong(){
       if(currentSong!=0)
       {
        currentSong--;
        currentSong = currentSong % playlist.length;
       }
    }

    let player;
    function onPlayerReady(event) {
        player = event.target;
        loadAndPlayCurrentSong(event.target);
        player.playVideo();
    }

    function handlePlayMusic() {
        player.playVideo();
    }

    function handlePauseMusic(){
        player.pauseVideo();
    }

    function handlePlayPreviousMusic(){
        console.log("Play Previous Song")
        decSong();
        loadAndPlayCurrentSong(player)
    }

    function handlePlayNextSong() {
        console.log("Play next Song")
        incSong();
        loadAndPlayCurrentSong(player)
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    if(store.youtubeState == "Player")
    {
        console.log("state: "+ store.youtubeState)

         return <div>
            <YouTube
                videoId={playlist[currentSong]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} />
                <div style={{backgroundColor:'#E6E6FA',position:'fixed',width:'31%'}}>
                    <div style={{fontSize:'30px',textAlign:'center'}}>
                        Now Playing
                    </div>

                    <div style={{fontSize:'30px',marginTop:"5%"}}>
                        <div>
                            Playlist: Pink Floyd Roadtrip
                        </div>
                        <div>
                           Song #: 2
                        </div>
                        <div>
                           Title:  Set The Controls For The Heart Of The Sun 
                        </div>
                        <div>
                            Artist: Pink Floyd
                        </div>
                        <div style={{backgroundColor:'white', borderRadius:'25px'}} >
                            <IconButton style={{marginLeft:'35%'}} onClick = {handlePlayPreviousMusic}>
                                <FastRewindRoundedIcon style={{fontSize:'35pt'}}/>
                            </IconButton>

                            <IconButton onClick={handlePauseMusic}>
                                <StopRoundedIcon style={{fontSize:'35pt'}}/>
                            </IconButton>
                            
                            <IconButton onClick={handlePlayMusic}>
                                <PlayMusicIcon style={{fontSize:'35pt'}}/>
                            </IconButton>

                            <IconButton onClick={handlePlayNextSong}>
                                <FastForwardRoundedIcon style={{fontSize:'35pt'}}/>
                            </IconButton>
                  </div>

                    </div>
                
                </div>
           
         </div>;
    }
    else{
        console.log("state: "+ store.youtubeState)
        return (
                <div>
                    this is a Comment
                </div>
        )
    }


    

    // return <YouTube
    //     videoId={playlist[currentSong]}
    //     opts={playerOptions}
    //     onReady={onPlayerReady}
    //     onStateChange={onPlayerStateChange} />;
}