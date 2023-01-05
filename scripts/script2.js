var apikey = "9f3a144b762612624edfc59b0e3451ad";
//var artist = prompt("artist name");
var albumList = new Array();
document.getElementById("AlbumName").style.display = "none";
document.getElementById("selectNumber").style.display = "none";
document.getElementById("loading").style.display = "none";








 async function loadThis(changedArtist) 
    {
      

      
      albumList = [];
      var url = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + changedArtist + "&autocorrect=1&api_key=" + apikey + "&format=json";
      let obj = await (await fetch(url)).json();
      for (var i = 0; (i < obj.topalbums.album.length) && (i < 20); i++) 
      {
        albumList.push(obj.topalbums.album[i].name) 
      }
      const artNames = document.getElementById("artNames");
      artNames.dataset.artist = obj.topalbums.album[0].artist.name;




      makeList(albumList);
    
     
    }

    var buttonArtist = document.getElementById("ArtistButton");
    buttonArtist.addEventListener('click', function() 
    { 
     changedArtist = prompt("Pick A New Artist");
     loadThis(changedArtist);
    }, false);
