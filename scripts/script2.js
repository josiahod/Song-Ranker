var apikey = "9f3a144b762612624edfc59b0e3451ad";
var artist = prompt("artist name");
var albumList = new Array();



 async function loadThis(changedArtist) 
    {
      


      albumList = [];
      var url = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + changedArtist + "&autocorrect=1&api_key=" + apikey + "&format=json";
      let obj = await (await fetch(url)).json();
      var namMember = new Array();
      for (var i = 0; (i < obj.topalbums.album.length) && (i < 20); i++) 
      {
        albumList.push(obj.topalbums.album[i].name) 
      }
      const artNames = document.getElementById("artNames");
      artNames.dataset.artist = obj.topalbums.album[0].artist.name;

      var objTo2 = document.getElementById('AlbumName');
      objTo2.textContent = "Select " + artNames.dataset.artist + " Album To Rank";


      var select = document.getElementById("selectNumber");

      function removeOptions(selectElement) 
      {
        var i, L = selectElement.options.length - 1;
        for(i = L; i >= 0; i--) {
           selectElement.remove(i);
        }
     }

     removeOptions(select);

     var opt = "Pick An Album";
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
     
      for(var i = 0; i < albumList.length; i++) 
      {
        var opt = albumList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }

    }

    loadThis(artist);


    var buttonArtist = document.getElementById("ArtistButton");
    buttonArtist.addEventListener('click', function() 
    { 
     changedArtist = prompt("Pick A New Artist");
     loadThis(changedArtist);
    }, false);
