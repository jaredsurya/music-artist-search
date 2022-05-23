//To build app further, we could add in BANDSINTOWN tour date functionality:
// BANDSINTOWN APP ID: 96950d65ce9ce5445e9876ef7a980447 (good for 3 months only)

document.addEventListener('DOMContentLoaded', (event) => {

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

goBtn.addEventListener('click', submitHandler)

function submitHandler(event){
  event.preventDefault()
  //console.log(inputForm.value)
  if (inputForm.value === ""){
    alert("Type in an artist to query first.")
    return
  } else {
  hideAllInfo()
  artistFetch(inputForm.value)
  //buttonEnable(inputForm.value)
  inputForm.value = ""
  }
}

function hideAllInfo(){
  vidsArea.innerHTML = ""
  vidsArea.style.visibility = "hidden"
  detailsArea.innerHTML = ""
  detailsArea.style.visibility = "hidden"
  discogArea.innerHTML = ""
  discogArea.style.visibility = "hidden"
}

function hideOthers(btnID){
  if (btnID === "details"){
    vidsArea.innerHTML = ""
    vidsArea.style.visibility = "hidden"
    discogArea.innerHTML = ""
    discogArea.style.visibility = "hidden"
  } else if (btnID === "discog"){
    detailsArea.innerHTML = ""
    detailsArea.style.visibility = "hidden"
    vidsArea.innerHTML = ""
    vidsArea.style.visibility = "hidden"
  } else if (btnID === "vids"){
    discogArea.innerHTML = ""
    discogArea.style.visibility = "hidden"
    detailsArea.innerHTML = ""
    detailsArea.style.visibility = "hidden"
  }
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
    if(data.artists[0].strArtistFanart == null) {
      mainImg.style.visibility = "hidden"
    } else {
      mainImg.style.visibility = "visible"
    }
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
        hideOthers(e.target.id)
        renderDetails(artistData)
      } else if (e.target.id === "discog"){
        //console.log("DISCOG CLICKED")
        hideOthers(e.target.id)
        fetchDiscog(artistData)        
      } else if (e.target.id === "vids"){
        //fconsole.log("VIDS CLICKED")
        hideOthers(e.target.id)
        renderVids(artistData)
      } else if (e.target.id === "top"){
        //console.log("TOP CLICKED")
        window.scrollTo(0, 0)
      } else if (e.target.id === "considerations"){
        alert('Considerations:\n\nThis page was made with the help of Flatiron School and the "theaudiodb.com" web API.\n\nThanks for your help!')
      }
    }

function renderDetails(artistData){
  if (detailsArea.style.visibility === "visible"){
    detailsArea.innerHTML = ""
    detailsArea.style.visibility = "hidden"
  } else {
  // replaces falsy values like null or "" with NOT FOUND
  for(const property in artistData){
    artistData[property] ? artistData[property] : (artistData[property] = "NOT FOUND")
  }
  let container = document.createElement('div')
  container.id = "artistDetail"
  container.className = "info"
  let bullets = document.createElement('ul')
  bullets.style.listStyle = "none"
  let web = document.createElement('li')
  web.innerHTML = `<strong>${artistData.strArtist} website:</strong> <a href="${artistData.strWebsite}">${artistData.strWebsite ? artistData.strWebsite : "NO WEBSITE"}</a>`
  let originYr = document.createElement('li')
  let originPlace = document.createElement('li')
  originYr.innerHTML = `<strong>Origin year:</strong> ${artistData.intFormedYear}`
  originPlace.innerHTML = `<strong>Origin place:</strong> ${artistData.strCountry}`
  let label = document.createElement('li')
  label.innerHTML = `<strong>Record Label:</strong> ${artistData.strLabel}`
  let genre = document.createElement('li')
  genre.innerHTML = `<strong>Genre:</strong> ${artistData.strGenre}`
  let mood = document.createElement('li')
  mood.innerHTML = `<strong>Mood:</strong> ${artistData.strMood}`
  let bioTitle = document.createElement('p')
  let bio = document.createElement('p')
  bioTitle.innerHTML = `<strong>${artistData.strArtist} Biography:</strong>`
  bio.innerText = artistData.strBiographyEN
  bullets.append(web, originYr, originPlace, label, genre, mood)
  container.append(bullets, bioTitle, bio)
  detailsArea.append(container)
  detailsArea.style.visibility = "visible"
  }
}


function fetchDiscog(artistData){
  let artistID = artistData.idArtist
  fetch("https://theaudiodb.com/api/v1/json/2/album.php?i=" + artistID)
  .then(response => response.json())
  .then((data) => renderDiscog(data))
  
}

function renderDiscog(data){
  let fullDiscog = data.album
  //console.log(fullDiscog.intYearReleased)
  if (discogArea.style.visibility === "visible"){
    discogArea.innerHTML = ""
    discogArea.style.visibility = "hidden"
  } else {
      // replaces falsy values like null or "" with NOT FOUND
  //console.log(fullDiscog)
  fullDiscog.sort((a, b) => parseFloat(a.intYearReleased) - parseFloat(b.intYearReleased))
  //console.log("NEW", fullDiscog)
  fullDiscog.forEach((album) => {
    for (const property in album) {
    album[property] ? album[property] : (album[property] = "NOT FOUND")
  }
    //console.log(album.intYearReleased, album.strAlbum)
    let container = document.createElement("div")
    container.className = "album info"
    let albumImg = document.createElement("img")
    albumImg.className = "albumImg"
    albumImg.src = album.strAlbumThumb
    albumImg.alt = "No album image to show."
    let albumName = document.createElement("h3")
    albumName.innerText = album.strAlbum
    let albumYr = document.createElement("p")
    if (album.intYearReleased === "0"){
      albumYr.innerText = "Year released: NOT FOUND"
    } else {
      albumYr.innerText = "Year released: " + album.intYearReleased
    }
    let albumLabel = document.createElement("p")
    if(album.strLabel === null){
      albumLabel.innerText = "Record Label: NOT FOUND"
    } else {
    albumLabel.innerText = "Record Label: " + album.strLabel
    }
    container.append(albumImg, albumName, albumYr, albumLabel)
    discogArea.append(container)
    discogArea.style.visibility = "visible"
  })
  }}


function renderVids(data){
  //console.log(data)
  fetch("https://theaudiodb.com/api/v1/json/2/mvid.php?i=" + data.idArtist)
  .then(res => res.json())
  .then(vidData => {
    if(vidData.mvids == null){
      alert("No music videos for this artist.")
    } else {
      listVids(vidData)
    }
  })
    
    function listVids(vidData){
      if (vidsArea.style.visibility === "visible"){
        vidsArea.innerHTML = ""
        vidsArea.style.visibility = "hidden"
      } else {
        vidData.mvids.forEach((vid) => {
          ///console.log(vid)
          let container = document.createElement("div")
          container.className = "mVids info"
          let track = document.createElement("h3")
          track.className = "title"
          track.innerText = vid.strTrack
          track.href = vid.strMusicVid
          //
          //YOUTUBE I-FRAME works when site is opened from localhost:8080, i.e. http-server NPM node add-on
          //would not play when i-frame was accessed from a regular local ip address
          // https://stackoverflow.com/questions/51969269/embedded-youtube-video-doesnt-work-on-local-server
          // https://www.npmjs.com/package/http-server
          //
          let vidPlayer = document.createElement("iframe")
          vidPlayer.className = "vidPlayer"
          let playerURL = vid.strMusicVid.slice(vid.strMusicVid.length - 11, vid.strMusicVid.length)
          vidPlayer.src = "https://www.youtube.com/embed/" + playerURL
          vidPlayer.autoplay = "false"
          vidPlayer.frameborder = 0
          vidPlayer.allow ="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          vidPlayer.setAttribute('allowfullscreen', '')
          //console.log(vidPlayer.src)
          let trackDescription = document.createElement("p")
          trackDescription.innerText = vid.strDescriptionEN
          container.append(track, vidPlayer, trackDescription)
          vidsArea.append(container)
          vidsArea.style.visibility = "visible"
        })
      }
    }
  }
})