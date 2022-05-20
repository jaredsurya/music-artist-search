// FROM: https://www.theaudiodb.com/api_guide.php?ref=apilist.fun

// Return Artist details from artist name
// search.php?s={Artist name}
// Example - theaudiodb.com/api/v1/json/2/search.php?s=coldplay

// Return Discography for an Artist with Album names and year only
// discography.php?s={Artist_Name}
// Example - theaudiodb.com/api/v1/json/{APIKEY}/discography.php?s=coldplay
// https://theaudiodb.com/api/v1/json/2/discography.php?s=

// Return all the Music videos for a known TADB_Artist_ID
// mvid.php?i=(artistid}
// https://theaudiodb.com/api/v1/json/2/mvid.php?i=

// BANDSINTOWN APP ID: 96950d65ce9ce5445e9876ef7a980447 (good for 3 months)

const goBtn = document.getElementById("goBtn")
const detailsBtn = document.getElementById("details")
const discogBtn = document.getElementById("discog")
const vidsBtn = document.getElementById("vids")
const topBtn = document.getElementById("top")
const inputForm = document.getElementById("formInput")
const artistTitle = document.getElementById("name")
const mainImg = document.getElementById("mainImg")
const buttons = document.getElementsByClassName("buttons")
let vidsArea = document.getElementById("artistVids")
let detailsArea = document.getElementById("artistDetails")
let discogArea = document.getElementById("artistDiscog")
let artistData
let discogData
let mvData
// add event listener to GO! button and preventDefault
goBtn.addEventListener('click', submitHandler)

function submitHandler(event){
  event.preventDefault()
  //console.log(inputForm.value)
  vidsArea.innerHTML = ""
  detailsArea.innerHTML = ""
  discogArea.innerHTML = ""
  if (inputForm.value == ""){
    alert("Type in an artist to query first.")
  } else
  artistFetch(inputForm.value)
  //buttonEnable(inputForm.value)

  inputForm.value = ""
}

function artistFetch(string){
  let artistURL = `https://theaudiodb.com/api/v1/json/2/search.php?s=` + string
  //console.log(artistURL)
  fetch(artistURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    renderArtist(data)
    buttonEnable()

  })
}

function renderArtist(data){
  if(data.artists === null){
    console.log("NO ARTIST")
    artistTitle.innerText = "Sorry, no artist found!"
    mainImg.style.visibility = "hidden"
    for (const button of buttons){
      button.style.visibility = "hidden"
    }
  } else {
    artistData = data.artists[0]
    artistTitle.innerText = data.artists[0].strArtist
    mainImg.src = data.artists[0].strArtistFanart
    mainImg.style.visibility = "visible"
    for(const button of buttons){
      //console.log("HERE")
      button.style.visibility = 'visible'
    }
  }
}

function buttonEnable(){
  for(const button of buttons){
    button.addEventListener("click", activate)
  }
}

function activate(e) {
      if (e.target.id === "details"){
        //console.log("DETAILS CLICKED")
        renderDetails(artistData)
      } else if (e.target.id === "discog"){
        //console.log("DISCOG CLICKED")
        fetchDiscog(artistData)        
      } else if (e.target.id === "vids"){
        //fconsole.log("VIDS CLICKED")
        renderVids(artistData)
      } else if (e.target.id === "top"){
        console.log("TOP CLICKED")
        window.scrollTo(0, 0)
      }
    }

function renderDetails(artistData){
  console.log(artistData)
}

function fetchDiscog(artistData){
  let artistID = artistData.idArtist
  fetch("https://theaudiodb.com/api/v1/json/2/album.php?i=" + artistID)
  .then(response => response.json())
  .then((data) => renderDiscog(data))

}

function renderDiscog(data){
  let fullDiscog = data.album
  console.log(fullDiscog)
  for (const album in fullDiscog){

  }

}

function renderVids(data){
  //console.log(data)
  fetch("https://theaudiodb.com/api/v1/json/2/mvid.php?i=" + data.idArtist)
  .then(res => res.json())
  .then(vidData => listVids(vidData))
  function listVids(vidData){
    vidData.mvids.forEach((vid) => {
      console.log(vid)
      let container = document.createElement("div")
      container.className = "mVids"
      let track = document.createElement("h3")
      track.className = "title"
      track.innerText = vid.strTrack
      track.href = vid.strMusicVid
      let trackLink = document.createElement("a")
      trackLink.className = "link"
      trackLink.href = vid.strMusicVid
      trackLink.innerText = "Click here to watch."
      let trackDescription = document.createElement("p")
      trackDescription.innerText = vid.strDescriptionEN
      container.append(track, trackLink, trackDescription)
      vidsArea.append(container)
    })
  }
}