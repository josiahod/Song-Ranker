var apikey = "9f3a144b762612624edfc59b0e3451ad";
//var artist = prompt("artist name");
var albumList = new Array();
document.getElementById("AlbumName").style.display = "none";
document.getElementById("selectNumber").style.display = "none";
document.getElementById("loading").style.display = "none";

 
function favoriteAlbum()
{
  var favoritestar = document.querySelector('.favorite-button');
  console.log(favoritestar);
  favoritestar.classList.remove('favorite-button');
  console.log(favoritestar);
  favoritestar.classList.add('favorite-button-filled');  
  var artistVal = artNames.dataset.artist;
  var albumVal = j.value;
  console.log(albumVal);
  const favoriteUrl = 'https://codd.cs.gsu.edu/~jodunade1/php/songRanker.php';
  const data = {
    username: username,
    artist: artistVal,
    album: albumVal
  };

  fetch(favoriteUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }

  var star = document.getElementById("star");
  star.addEventListener('click', function()
  { 
    if (!document.querySelector('.favorite-button'))
    {
      console.log("album is favorited");
      try
      {
        var removeFavorite = document.querySelector('.favorite-button-filled');
        removeFavorite.classList.remove('favorite-button-filled');
        removeFavorite.classList.add('favorite-button'); 

            const favoriteUrl = 'https://codd.cs.gsu.edu/~jodunade1/php/removeFave.php';
            const data = {
            username: username,
            artist:  artNames.dataset.artist,
            album: j.value
          };

          fetch(favoriteUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });

        }
        catch(e)
        {
          console.log("error in star");
        }
    }
    else
    {
    favoriteAlbum();
    }
  }, false);








 async function loadThis(changedArtist) 
    {
     
      if(changedArtist.toUpperCase() == "TXT")
      {
        changedArtist = "TOMORROW X TOGETHER";
      }
      

      
      albumList = [];
      var url = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + changedArtist + "&autocorrect=1&api_key=" + apikey + "&format=json";
      console.log(url);
      let obj = await (await fetch(url)).json();
      console.log(obj);
      for (var i = 0; (i < obj.topalbums.album.length) && (i < 20); i++) 
      {
        albumList.push(obj.topalbums.album[i].name) 
      }
      console.log(albumList);
      const artNames = document.getElementById("artNames");
      artNames.dataset.artist = obj.topalbums.album[0].artist.name;

      if(changedArtist.toUpperCase() == "ARIANA GRANDE")
      {
       albumList.push("eternal sunshine");
      } 

           if(changedArtist.toUpperCase() == "BEYONCE")
      {
       albumList.push("COWBOY CARTER");
      } 


      makeList(albumList);
    
     
    }document.getElementById('AlbumName')


    var buttonArtist = document.getElementById("ArtistButton");
    buttonArtist.addEventListener('click', function() 
    { 
     changedArtist = prompt("Pick A New Artist").trim();
     loadThis(changedArtist);
    }, false);
