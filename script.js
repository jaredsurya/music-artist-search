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
// Example - theaudiodb.com/api/v1/json/{APIKEY}/mvid.php?i=112024

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
let artistData
let discogData
let mvData
// add event listener to GO! button and preventDefault
goBtn.addEventListener('click', submitHandler)

function submitHandler(event){
  event.preventDefault()
  //console.log(inputForm.value)
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
    //console.log(data)
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
        console.log("VIDS CLICKED")
        
      } else if (e.target.id === "top"){
        console.log("TOP CLICKED")
        window.scrollTo(0, 0)
      }
    }

function renderDetails(artistData){
  console.log(artistData)
}

function fetchDiscog(artistData){
  let artistName = artistData.strArtist
  fetch("https://theaudiodb.com/api/v1/json/2/discography.php?s=" + artistName)
  .then(response => response.json())
  .then((data) => renderDiscog(data))

}

function renderDiscog(data){
  console.log(data)
}

function renderVids(data){

}